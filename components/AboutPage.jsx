"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, memo } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Award,
  Briefcase,
  Code2,
  Rocket,
  Zap,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Wrench,
} from "lucide-react";
import Navbar from "./Navbar";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Static data
const languages = [
  { name: "English", level: "Professional fluency", flag: "🇬🇧" },
  { name: "Hindi", level: "Native / bilingual", flag: "🇮🇳" },
];

const softwareSkills = [
  { name: "SolidWorks · Solid Edge", icon: Code2 },
  { name: "Siemens NX · ANSYS", icon: Wrench },
  { name: "MATLAB · Simulink", icon: Cpu },
  { name: "Python · ML Stack", icon: Code2 },
];

const experiences = [
  {
    id: 1,
    role: "Production Engineering Intern",
    company: "Larsen & Toubro – Precision Engineering & Systems IC, Hazira",
    period: "May – Jul 2025",
    description:
      "Validated heavy-lift fixtures (450 MT and 24 MT) using Siemens NX FEA and Solid Edge, applying DFM and GD&T to deliver manufacturable, shop-floor-ready designs.",
    highlights: [
      "Validated 450 MT lifting fixture",
      "Designed 24 MT deck fixture with safety factor >1.5",
      "Applied DFM principles for manufacturability",
    ],
    href: "/experience/production-engineering-intern-lt",
    ctaLabel: "View internship details",
  },
  {
    id: 2,
    role: "Research: Condition Monitoring of Ball Bearings using AI",
    company: "ICRAM 2025, IITRAM",
    period: "2024 – 2025",
    description:
      "Developed a CNN-based thermal image classification model for bearing fault detection, achieving ~99%+ accuracy and demonstrating potential for predictive maintenance.",
    highlights: [
      "99.83% accuracy achieved",
      "CNN-based thermal imaging model",
      "Published at ICRAM 2025",
    ],
    href: "/projects/condition-monitoring-ball-bearings-ai",
    ctaLabel: "Open research project page",
  },
];

const leadership = [
  {
    title: "President — I-MECH, PDEU",
    period: "Aug 2023 – Present",
    summary:
      "Leading a mechanical engineering community, organizing technical events, workshops and industry interactions to boost hands-on learning.",
    icon: Award,
  },
  {
    title: "Executive Director — Mech-A-Tech Newsletter",
    period: "Jan 2023 – Present",
    summary:
      "Managing content and publication of the department newsletter, curating technical articles and project highlights for students and faculty.",
    icon: Briefcase,
  },
];

const projects = [
  {
    title: "SPECTRA — Exoplanet Detection Web App",
    tag: "NASA Space Apps · ML + Web",
    summary:
      "AI-powered exoplanet detector that classifies celestial objects and predicts planetary type, habitability, and surface water potential using Kepler mission data.",
    href: "/projects/spectra-exoplanet-detection",
    icon: Rocket,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Condition Monitoring of Ball Bearings using AI",
    tag: "Predictive Maintenance · CNN",
    summary:
      "CNN model on thermal images to classify six bearing conditions, enabling automated industrial fault detection and monitoring.",
    href: "/projects/condition-monitoring-ball-bearings-ai",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Formula 1 Race Position Prediction",
    tag: "XGBoost · Optuna · Analytics",
    summary:
      "Built a race outcome predictor using XGBoost with Optuna tuning on 2018–2024 F1 data, achieving low MAE and interpretable feature importance.",
    href: "/projects/f1-race-position-predictor",
    icon: TrendingUp,
    gradient: "from-red-500 to-orange-500",
  },
  {
    title: "Cross-Axis Wind Turbine for Urban Environments",
    tag: "Wind Energy · Hardware",
    summary:
      "Proposed and prototyped a cross-axis wind turbine with 3 vertical + 6 horizontal 3D-printed blades and a planetary gearbox to harness complex urban wind profiles.",
    href: "/projects/cross-axis-wind-turbine-urban",
    icon: Award,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Casting Defect Detection using Deep Learning",
    tag: "Quality Inspection · MobileNetV2",
    summary:
      "Transfer learning pipeline with MobileNetV2 to detect casting surface defects, using augmentation, regularization and thorough evaluation.",
    href: "/projects/casting-defect-detection-dl",
    icon: CheckCircle2,
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    title: "GSLV Mk III Launch Vehicle Simulation",
    tag: "MATLAB · Trajectory Modeling",
    summary:
      "Simulated 3-stage launch vehicle dynamics (S200, L110, CE-20), modeling thrust, drag and gravity losses to study trajectory and performance.",
    href: "/projects/gslv-mk3-launch-vehicle-simulation",
    icon: Rocket,
    gradient: "from-indigo-500 to-purple-500",
  },
];

const skillChips = [
  "Mechanical Design",
  "CAD (SolidWorks / Siemens NX / Solid Edge)",
  "Fusion 360",
  "ANSYS Workbench",
  "MATLAB / Simulink",
  "Python",
  "PyTorch / TensorFlow",
  "Computer Vision",
  "Robotics",
  "Simulation",
  "Control Systems",
  "ML for Engineering",
  "Condition Monitoring",
];

const skillBars = [
  { label: "Python & Scientific Stack", level: 85, icon: Code2 },
  { label: "Deep Learning / PyTorch / TensorFlow", level: 82, icon: Zap },
  { label: "Computer Vision / OpenCV", level: 78, icon: Rocket },
  { label: "CAD & FEA (SolidWorks / NX / ANSYS)", level: 84, icon: Briefcase },
  { label: "MATLAB / Simulink", level: 78, icon: TrendingUp },
  { label: "Control, Robotics & Mechatronics", level: 72, icon: Award },
];

// Memoized components
const BackgroundEffects = memo(() => (
  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
    <motion.div
      animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[radial-gradient(circle,#FFA50033,transparent_60%)] blur-3xl"
    />
    <motion.div
      animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[radial-gradient(circle,#FFA50033,transparent_60%)] blur-3xl"
    />
    <motion.div
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,#FFA50015,transparent_70%)] blur-3xl"
    />
    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
  </div>
));
BackgroundEffects.displayName = "BackgroundEffects";

const SkillChip = memo(({ chip, idx }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: idx * 0.05 }}
    whileHover={{
      y: -3,
      scale: 1.05,
      borderColor: "#FFA500",
      color: "#FFA500",
      boxShadow: "0 0 20px rgba(255,165,0,0.3)",
    }}
    whileTap={{ scale: 0.95 }}
    className="px-4 py-2 bg-[#151515] border border-[#FFA50033] text-[#E0E4EB] rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer"
  >
    {chip}
  </motion.span>
));
SkillChip.displayName = "SkillChip";

const ProjectCard = memo(({ project, idx, isHovered, onHover, onLeave }) => {
  const IconComponent = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-[#101010]/95 border border-[#FFA500]/20 rounded-2xl p-6 transition-all cursor-pointer overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
      />

      <Link href={project.href} className="relative flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-4">
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="bg-[#FFA500]/10 border border-[#FFA500]/30 rounded-xl p-3"
          >
            <IconComponent size={24} className="text-[#FFA500]" />
          </motion.div>
          <motion.span
            animate={{
              scale: isHovered ? 1.05 : 1,
              borderColor: isHovered ? "#FFA500" : "rgba(255,165,0,0.5)",
            }}
            className="inline-flex items-center justify-center rounded-full border text-[#FFA500] text-[0.65rem] px-3 py-1 gap-1"
          >
            <ExternalLink size={12} />
          </motion.span>
        </div>

        <h3 className="text-base font-bold text-[#E0E4EB] group-hover:text-[#FFA500] transition-colors mb-2">
          {project.title}
        </h3>

        <p className="text-xs text-[#9CA3AF] mb-3 font-medium">{project.tag}</p>

        <p className="text-xs text-[#CBD2E0] leading-relaxed flex-1 mb-4">
          {project.summary}
        </p>

        <motion.div
          animate={{ x: isHovered ? 5 : 0 }}
          className="flex items-center gap-2 text-xs text-[#FFA500] font-semibold"
        >
          View details
          <ChevronRight size={14} />
        </motion.div>
      </Link>
    </motion.div>
  );
});
ProjectCard.displayName = "ProjectCard";

export default function HomePage() {
  const [activeExperience, setActiveExperience] = useState(experiences[0]);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState(languages[0]);

  // Memoize handlers
  const handleProjectHover = useMemo(
    () => (idx) => () => setHoveredProject(idx),
    []
  );
  const handleProjectLeave = useMemo(() => () => setHoveredProject(null), []);

  return (
    <main className="relative min-h-screen bg-[#0F0F0F] text-[#E0E4EB] overflow-hidden">
      <Navbar />
      <BackgroundEffects />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-12"
      >
        {/* HERO + ABOUT */}
        <motion.section id="hero" variants={item} className="mb-20">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E0E4EB] mb-3 tracking-[0.25em]">
              NEELAY JAIN
            </h1>
            <p className="text-[0.7rem] md:text-xs text-[#9CA3AF] tracking-[0.28em] uppercase">
              B.Tech Mechanical · Minor in Computational Data Science · PDEU Gandhinagar
            </p>
          </div>

          <div
            id="about"
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
          >
            {/* IMAGE */}
            <motion.div className="relative mx-auto lg:mx-0 order-2 lg:order-1">
              <div className="relative w-[20rem] h-[13rem] md:w-[24rem] md:h-[15rem] lg:w-[30rem] lg:h-[18rem]">
                <motion.div
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.08, 1],
                    rotate: [0, 6, 0],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-10 w-72 h-72 bg-[radial-gradient(circle,#FFA50050,transparent_70%)] rounded-full blur-3xl"
                />
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1.05, 1, 1.05],
                    rotate: [0, -6, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-10 -left-10 w-72 h-72 bg-[radial-gradient(circle,#FF7F3250,transparent_70%)] rounded-full blur-3xl"
                />

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 16 }}
                  className="relative z-10 rounded-3xl overflow-hidden border-2 border-[#FFA500]/50 shadow-[0_0_40px_rgba(255,165,0,0.35)] bg-gradient-to-br from-[#1A1A1A] via-[#0F0F0F] to-[#050505]"
                >
                  <div className="relative w-[28rem] h-[17rem] rounded-3xl overflow-hidden">
                    <Image
                      src="/me.jpg"
                      alt="Neelay Jain"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="absolute -bottom-7 left-4 z-20 bg-[#0F0F0F]/95 backdrop-blur-md border border-[#FFA500]/70 text-[#FFA500] px-4 py-2 rounded-full text-[0.7rem] font-semibold shadow-[0_0_20px_rgba(255,165,0,0.45)]"
                >
                  <div className="flex items-center gap-2">
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1], scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-[#FFA500] rounded-full"
                    />
                    <span>Mechanical Engineering · AI &amp; Data</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -bottom-7 right-4 bg-[#151515]/95 border border-[#FFA500]/40 rounded-full px-3 py-1.5 text-[0.7rem] text-[#E0E4EB] flex items-center gap-3 shadow-[0_0_16px_rgba(0,0,0,0.8)]"
                >
                  <span className="flex items-center gap-1">
                    CGPA <span className="font-semibold text-[#FFA500]">9.53</span>
                  </span>
                  <span className="h-3 w-px bg-[#333]" />
                  <span className="flex items-center gap-1">
                    Projects <span className="font-semibold text-[#FFA500]">10+</span>
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* TEXT */}
            <motion.div
              variants={item}
              className="space-y-6 order-1 lg:order-2 lg:max-w-xl lg:ml-auto"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFA500] to-[#FF7F32] opacity-20"
                  />
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#FFA500]">
                    About Me
                  </p>
                </div>

                <motion.h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#E0E4EB] leading-tight">
                  Hi, I&apos;m{" "}
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 16px rgba(255,165,0,0.3)",
                        "0 0 32px rgba(255,165,0,0.6)",
                        "0 0 16px rgba(255,165,0,0.3)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="block mt-1 bg-gradient-to-r from-[#FFA500] via-[#FF8C00] to-[#FFA500] bg-clip-text text-transparent"
                  >
                    Neelay Jain
                  </motion.span>
                </motion.h2>
              </div>

              <div className="space-y-4 bg-[#101010]/60 backdrop-blur-sm border border-[#FFA500]/20 rounded-2xl p-5 lg:p-6">
                <p className="text-sm md:text-base text-[#E0E4EB] leading-relaxed font-medium">
                  Mechanical engineering undergrad with a minor in Computational Data
                  Science. I enjoy taking engineering problems from first principles to
                  data-driven models and real prototypes.
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.2, duration: 1 }}
                  className="h-px bg-gradient-to-r from-transparent via-[#FFA500]/50 to-transparent"
                />
                <p className="text-xs md:text-sm text-[#CBD2E0] leading-relaxed">
                  My work spans{" "}
                  <span className="text-[#FFA500] font-semibold">CAD, FEA, DFM</span>{" "}
                  and control on one side, and{" "}
                  <span className="text-[#FFA500] font-semibold">
                    machine learning, computer vision
                  </span>{" "}
                  and simulation on the other, with a focus on aerospace, energy, and
                  mechanical systems.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="mailto:neelayjain957@gmail.com"
                  whileHover={{ y: -2, scale: 1.03 }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#FFA500]/15 border border-[#FFA500]/60 px-4 py-2 text-xs md:text-sm font-semibold text-[#FFA500]"
                >
                  <Mail size={14} /> Email
                </motion.a>
                <motion.a
                  href="#projects"
                  whileHover={{ y: -2, scale: 1.03 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#FFA500]/30 px-4 py-2 text-xs md:text-sm font-semibold text-[#E0E4EB]"
                >
                  <Rocket size={14} /> View Projects
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* EXPERIENCE */}
        <motion.section id="experience" variants={container} className="mb-20">
          <motion.div variants={item}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#E0E4EB] mb-8">
              Experience &amp; Research
            </h2>

            <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
              {experiences.map((exp) => (
                <motion.button
                  key={exp.id}
                  onClick={() => setActiveExperience(exp)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                    activeExperience.id === exp.id
                      ? "bg-[#FFA500] text-[#0F0F0F] shadow-[0_0_30px_rgba(255,165,0,0.4)]"
                      : "bg-[#151515] text-[#9CA3AF] border border-[#FFA500]/20 hover:border-[#FFA500]/50"
                  }`}
                >
                  {exp.period}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeExperience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#101010]/95 border-2 border-[#FFA500]/40 rounded-2xl p-8 shadow-[0_0_40px_rgba(255,165,0,0.15)]"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#E0E4EB] mb-2">
                      {activeExperience.role}
                    </h3>
                    <p className="text-sm text-[#A1A8B8] flex items-center gap-2">
                      <Briefcase size={16} className="text-[#FFA500]" />
                      {activeExperience.company}
                    </p>
                  </div>
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(255,165,0,0.3)",
                        "0 0 30px rgba(255,165,0,0.6)",
                        "0 0 20px rgba(255,165,0,0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-[#1A1A1A] text-[#FFA500] border border-[#FFA500]/50 px-5 py-2 rounded-full text-sm font-semibold"
                  >
                    {activeExperience.period}
                  </motion.div>
                </div>

                <p className="text-base text-[#CBD2E0] leading-relaxed mb-6">
                  {activeExperience.description}
                </p>

                {activeExperience.href && (
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Link href={activeExperience.href}>
                      <motion.span
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 24px rgba(255,165,0,0.45)",
                        }}
                        whileTap={{ scale: 0.96 }}
                        className="inline-flex items-center gap-2 bg-[#FFA500] text-[#0F0F0F] px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(255,165,0,0.35)]"
                      >
                        {activeExperience.ctaLabel || "View details"}
                        <ExternalLink size={16} />
                      </motion.span>
                    </Link>
                  </motion.div>
                )}

                <div className="space-y-3">
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold mb-3">
                    Key Highlights
                  </p>
                  {activeExperience.highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-[#FFA500] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-[#CBD2E0]">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Education + Languages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <div>
              <h3 className="text-2xl font-bold text-[#FFA500] mb-3">Education</h3>
              <div className="border border-[#FFA500]/20 rounded-lg p-4 bg-[#1A1A1A]/50 text-sm">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-xs font-bold text-[#FFA500] uppercase tracking-wider">
                    PDEU, Gandhinagar
                  </h4>
                  <span className="bg-[#FFA500] text-[#0F0F0F] px-3 py-0.5 rounded text-xs font-bold">
                    2023–Present
                  </span>
                </div>
                <p className="text-sm text-[#E0E4EB] font-medium mb-1">
                  B.Tech Mechanical · Minor in Computational Data Science
                </p>
                <p className="text-xs text-[#9CA3AF]">CGPA: 9.53 / 10</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#FFA500] mb-3">Languages</h3>
              <div className="flex flex-col gap-3 w-full max-w-lg">
                {languages.map((lang) => {
                  const isActive = activeLanguage.name === lang.name;
                  return (
                    <motion.button
                      key={lang.name}
                      whileHover={{ scale: 1.02, x: 4 }}
                      onClick={() => setActiveLanguage(lang)}
                      className={`flex items-center justify-between rounded-full border px-4 py-2 text-sm transition-all
                        ${
                          isActive
                            ? "border-[#FFA500] bg-[#FFA500]/15 shadow-[0_0_18px_rgba(255,165,0,0.3)]"
                            : "border-[#FFA500]/30 bg-[#101010] hover:bg-[#141414]"
                        }
                      `}
                    >
                      <div className="flex flex-col items-start">
                        <span
                          className={`font-semibold ${
                            isActive ? "text-[#FFA500]" : "text-[#E0E4EB]"
                          }`}
                        >
                          {lang.name}
                        </span>
                        <span className="text-xs text-[#9CA3AF]">
                          {lang.level}
                        </span>
                      </div>
                      <span className="text-2xl">{lang.flag}</span>
                    </motion.button>
                  );
                })}
              </div>

              <motion.div
                key={activeLanguage.name}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-xs md:text-sm text-[#CBD2E0] px-4 py-1.5 rounded-full bg-[#101010] border border-[#FFA500]/25 inline-block"
              >
                Currently highlighting:{" "}
                <span className="text-[#FFA500] font-semibold">
                  {activeLanguage.name}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* LEADERSHIP */}
        <motion.section id="leadership" variants={container} className="mb-20">
          <motion.div variants={item}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#E0E4EB] mb-8">
              Leadership &amp; Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {leadership.map((role, idx) => {
                const IconComponent = role.icon;
                return (
                  <motion.div
                    key={role.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{
                      y: -5,
                      borderColor: "#FFA500",
                      boxShadow: "0 0 30px rgba(255,165,0,0.2)",
                    }}
                    className="bg-[#101010]/95 border border-[#FFA500]/20 rounded-2xl p-6 transition-all group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#FFA500]/10 border border-[#FFA500]/30 rounded-full p-3"
                      >
                        <IconComponent size={24} className="text-[#FFA500]" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-[#E0E4EB] group-hover:text-[#FFA500] transition-colors mb-1">
                          {role.title}
                        </h3>
                        <span className="text-xs text-[#FFA500] font-medium">
                          {role.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[#CBD2E0] leading-relaxed">
                      {role.summary}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.section>

        {/* PROJECTS */}
        <motion.section id="projects" variants={container} className="mb-20">
          <motion.div variants={item}>
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#E0E4EB]">
                Selected Projects
              </h2>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="hidden md:flex items-center gap-2 text-xs text-[#FFA500] uppercase tracking-wider"
              >
                Hover to explore
                <ChevronRight size={16} />
              </motion.div>
            </div>
            <p className="text-sm md:text-base text-[#A1A8B8] mb-8">
              A mix of AI, simulation, mechanical systems, and real-world engineering
              problems.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  idx={idx}
                  isHovered={hoveredProject === idx}
                  onHover={handleProjectHover(idx)}
                  onLeave={handleProjectLeave}
                />
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* SKILLS */}
        <motion.section id="skills" variants={container} className="mb-20">
          <motion.div variants={item}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#E0E4EB] mb-3">
              Skills &amp; Tools
            </h2>
            <p className="text-sm md:text-base text-[#A1A8B8] mb-8">
              Mechanical design, simulation, and AI working together on real engineering
              systems.
            </p>

            <div className="mb-14">
              <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[#9CA3AF] mb-5">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillChips.map((chip, idx) => (
                  <SkillChip key={chip} chip={chip} idx={idx} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              <div className="xl:col-span-2 bg-[#101010]/95 border border-[#FFA500]/25 rounded-2xl p-8 md:p-10">
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[#9CA3AF] mb-8">
                  Proficiency
                </h3>
                <div className="space-y-7">
                  {skillBars.map((skill, idx) => {
                    const IconComponent = skill.icon;
                    return (
                      <motion.div
                        key={skill.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.5 }}
                            >
                              <IconComponent size={18} className="text-[#FFA500]" />
                            </motion.div>
                            <p className="text-sm md:text-base text-[#E0E4EB] font-semibold">
                              {skill.label}
                            </p>
                          </div>
                          <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 + 0.3 }}
                            className="text-xs md:text-sm font-bold text-[#FFA500]"
                          >
                            {skill.level}%
                          </motion.span>
                        </div>
                        <div className="w-full h-3 bg-[#1A1A1A] rounded-full overflow-hidden relative group">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{
                              duration: 1.5,
                              ease: "easeOut",
                              delay: idx * 0.1,
                            }}
                            whileHover={{
                              boxShadow: "0 0 25px rgba(255,165,0,0.8)",
                            }}
                            className="h-full bg-gradient-to-r from-[#FFA500] to-[#FF7F32] rounded-full shadow-[0_0_18px_rgba(255,165,0,0.6)] relative"
                          >
                            <motion.div
                              animate={{
                                x: ["-100%", "100%"],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                              }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#FFA500] mb-4">
                  Software Stack
                </h3>
                <div className="space-y-3">
                  {softwareSkills.map((skill) => {
                    const IconComponent = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.03, x: 4 }}
                        className="flex items-center gap-4 text-sm"
                      >
                        <div className="w-10 h-10 rounded-full border-2 border-[#FFA500] flex items-center justify-center text-[#FFA500] bg-[#1A1A1A]">
                          <IconComponent size={18} />
                        </div>
                        <span className="font-medium text-[#E0E4EB]">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* CONTACT / CTA */}
        <motion.section id="contact" variants={item} className="mb-10">
          <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            className="relative bg-[#101010]/95 border border-[#FFA500]/25 text-[#E0E4EB] rounded-2xl p-10 md:p-12 text-center shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFA50020,transparent_70%)]"
            />

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-3"
              >
                Let&apos;s Work Together
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-base text-[#A1A8B8] mb-8"
              >
                Open to internships and early-career roles in AI, robotics, aerospace,
                and data-driven mechanical systems.
              </motion.p>
              <div className="flex flex-wrap gap-4 justify-center mb-6">
                <motion.a
                  href="mailto:neelayjain957@gmail.com"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(255,165,0,0.5)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#FFA500]/15 border border-[#FFA500]/70 text-[#FFA500] px-8 py-3 rounded-full text-xs md:text-sm font-bold hover:bg-[#FFA500]/25 transition"
                >
                  Get in Touch
                </motion.a>
                <motion.a
                  href="#projects"
                  whileHover={{
                    scale: 1.05,
                    borderColor: "#FFA500",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-[#FFA500]/40 text-[#E0E4EB] px-8 py-3 rounded-full text-xs md:text-sm font-bold transition"
                >
                  View All Projects
                </motion.a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-[#CBD2E0]">
                <a
                  href="https://maps.google.com?q=Gandhinagar,+Gujarat,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#FFA500] transition-colors"
                >
                  <MapPin size={14} className="text-[#FFA500]" />
                  Gandhinagar, Gujarat, India
                </a>
                <a
                  href="tel:+918000880217"
                  className="flex items-center gap-2 hover:text-[#FFA500] transition-colors"
                >
                  <Phone size={14} className="text-[#FFA500]" />
                  +91-80008-80217
                </a>
                <a
                  href="mailto:neelayjain957@gmail.com"
                  className="flex items-center gap-2 hover:text-[#FFA500] transition-colors"
                >
                  <Mail size={14} className="text-[#FFA500]" />
                  neelayjain957@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/Neelayjain21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#FFA500] transition-colors"
                >
                  <Linkedin size={16} className="text-[#FFA500]" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Neelayjain02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#FFA500] transition-colors"
                >
                  <Github size={16} className="text-[#FFA500]" />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </motion.div>
    </main>
  );
}