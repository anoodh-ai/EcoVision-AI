import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

const steps = [
  {
    number: "01",
    icon: "📤",
    title: "Upload Image",
    description:
      "Upload a clear image of any waste item using your device.",
  },
  {
    number: "02",
    icon: "🤖",
    title: "AI Detection",
    description:
      "Our YOLO-powered AI identifies the waste and predicts its category.",
  },
  {
    number: "03",
    icon: "♻️",
    title: "Get Recycling Guide",
    description:
      "Receive recycling instructions, reuse ideas and environmental insights.",
  },
  {
    number: "04",
    icon: "📊",
    title: "Save to History",
    description:
      "Every detection is stored so you can review it later anytime.",
  },
];

export default function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-24"
    >
      {/* Background Glow */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-200/30 blur-[120px]" />
      <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-blue-200/30 blur-[140px]" />
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100/30 blur-[170px]" />

      <div className="relative z-10">
        <SectionTitle
          badge="How It Works"
          title="Complete Waste Detection in Four Simple Steps"
          description="EcoVision AI makes waste management easy through an intelligent and guided workflow."
        />

        <div className="mx-auto mt-20 grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-[30px] border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl transition-all duration-500 hover:shadow-[0_25px_60px_rgba(16,185,129,.18)]"
            >
              {/* Shine */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-all duration-1000 group-hover:translate-x-full" />

              {/* Glow */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl transition-all duration-500 group-hover:scale-150" />

              {/* Number */}
              <span className="absolute right-6 top-5 text-6xl font-black text-slate-100 opacity-70">
                {step.number}
              </span>

              {/* Icon */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className="mb-8 flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-700 text-5xl text-white shadow-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
              >
                {step.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold leading-tight text-slate-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-5 text-[15px] leading-8 text-slate-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Arrow Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 hidden items-center justify-center gap-8 xl:flex"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-xl transition-all duration-300 hover:-translate-y-2">
            📤
          </div>

          <span className="animate-pulse text-5xl font-light text-emerald-500">
            →
          </span>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-xl transition-all duration-300 hover:-translate-y-2">
            🤖
          </div>

          <span className="animate-pulse text-5xl font-light text-emerald-500">
            →
          </span>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-xl transition-all duration-300 hover:-translate-y-2">
            ♻️
          </div>

          <span className="animate-pulse text-5xl font-light text-emerald-500">
            →
          </span>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-xl transition-all duration-300 hover:-translate-y-2">
            📊
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative mx-auto mt-20 w-full max-w-7xl overflow-hidden rounded-[40px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 p-8 text-center shadow-[0_30px_80px_rgba(16,185,129,.25)] sm:p-10 md:p-12"
        >
          {/* CTA Shine */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-[1800ms] hover:translate-x-full" />

          {/* CTA Glow */}
          <div className="absolute -left-24 -top-24 h-60 w-60 rounded-full bg-white/10 blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 h-60 w-60 rounded-full bg-white/10 blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Try EcoVision AI?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-emerald-100 sm:text-lg">
              Upload a waste image and receive AI-powered detection,
              recycling guidance, reuse ideas and environmental insights.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">
              <Link
                to="/upload"
                className="rounded-2xl bg-white px-8 py-4 font-bold text-emerald-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                Detect Waste
              </Link>

              <Link
                to="/history"
                className="rounded-2xl border border-white/70 px-8 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-emerald-700"
              >
                View History
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}