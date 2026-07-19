import { motion } from "framer-motion";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

const stats = [
  {
    value: "21+",
    label: "Waste Classes",
    color: "text-emerald-600",
    glow: "from-emerald-400/20 to-emerald-600/5",
  },
  {
    value: "🎯",
    label: "Object Detection",
    color: "text-blue-600",
    glow: "from-blue-400/20 to-blue-600/5",
  },
  {
    value: "🔍",
    label: "Image Analysis",
    color: "text-purple-600",
    glow: "from-purple-400/20 to-purple-600/5",
  },
  {
    value: "♻️",
    label: "Smart Recycling",
    color: "text-orange-500",
    glow: "from-orange-400/20 to-orange-600/5",
  },
];

export default function About() {
  return (
    <Section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white py-28"
    >
      {/* ================= Background ================= */}

      <div className="absolute inset-0 overflow-hidden">

        {/* Top Glow */}
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
          }}
          className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-emerald-300/20 blur-[150px]"
        />

        {/* Right Glow */}
        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
          }}
          className="absolute top-20 -right-32 h-[500px] w-[500px] rounded-full bg-green-300/20 blur-[150px]"
        />

        {/* Bottom Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
          }}
          className="absolute bottom-[-180px] left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-emerald-200/20 blur-[170px]"
        />

        {/* Floating Circles */}

        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
          }}
          className="absolute left-24 top-44 h-6 w-6 rounded-full bg-emerald-300/50 blur-sm"
        />

        <motion.div
          animate={{
            y: [0, 25, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
          }}
          className="absolute right-40 top-60 h-8 w-8 rounded-full bg-green-300/40 blur-sm"
        />

        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
          }}
          className="absolute bottom-40 left-1/3 h-5 w-5 rounded-full bg-emerald-400/40 blur-sm"
       >

        </motion.div>

      </div>

      <div className="relative z-10">

        {/* Floating Badge */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="mb-8 flex justify-center"
        >
          <div className="group relative overflow-hidden rounded-full border border-emerald-200 bg-white/70 px-6 py-3 backdrop-blur-xl shadow-xl">

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full transition-all duration-1000 group-hover:translate-x-full" />

            <span className="relative flex items-center gap-2 text-sm font-semibold text-emerald-700">
              🤖 AI Powered Waste Intelligence
            </span>

          </div>

        </motion.div>

        <SectionTitle
          badge="About"
          title="Helping Everyone Recycle Smarter"
          description="EcoVision AI uses computer vision to identify waste and provide recycling guidance."
        />

        {/* ================= Main Glass Card ================= */}

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          whileHover={{
            y: -6,
          }}
          className="group relative mx-auto mt-20 max-w-6xl overflow-hidden rounded-[40px] border border-white/60 bg-white/70 p-12 shadow-[0_30px_80px_rgba(16,185,129,.12)] backdrop-blur-2xl"
        >

          {/* Shine */}

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full transition-all duration-[1800ms] group-hover:translate-x-full" />

          {/* Top Glow */}

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-[120px]" />

          {/* Bottom Glow */}

          <div className="absolute -bottom-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-green-300/10 blur-[120px]" />

          <div className="relative z-10">

            {/* About Text */}

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: .2 }}
              viewport={{ once: true }}
              className="mx-auto max-w-4xl text-center text-lg leading-10 text-slate-600"
            >
              Upload any waste image and EcoVision AI identifies the object,
              classifies its waste category, estimates confidence, recommends
              the correct recycling bin, provides recycling instructions,
              suggests reuse ideas, and explains the environmental impact.
            </motion.p>


            {/* ================= Premium Stats ================= */}

            <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                  }}
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl transition-all duration-500 hover:shadow-[0_30px_60px_rgba(16,185,129,.18)]"
                >
                  {/* Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.glow} opacity-0 transition-all duration-500 group-hover:opacity-100`}
                  />

                  {/* Shine */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-all duration-[1500ms] group-hover:translate-x-full" />

                  <div className="relative z-10">
                    <motion.h3
                      whileHover={{ scale: 1.08 }}
                      className={`text-5xl font-extrabold ${item.color}`}
                    >
                      {item.value}
                    </motion.h3>

                    <p className="mt-4 text-sm font-medium tracking-wide text-slate-600">
                      {item.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </Section>
  );
}