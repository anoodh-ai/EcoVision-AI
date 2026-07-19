import { motion } from "framer-motion";
import toast from "react-hot-toast";

import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

const features = [
  {
    icon: "🤖",
    title: "AI Waste Detection",
    badge: "AI Powered",
    description:
      "Instantly identify waste using our YOLO-powered computer vision model.",
    highlights: [
      "AI object detection",
      "Confidence score",
      "Waste identification",
    ],
  },
  {
    icon: "♻️",
    title: "Smart Recycling Guide",
    badge: "Eco Friendly",
    description:
      "Receive proper recycling guidance based on the detected waste type.",
    highlights: [
      "Correct recycling bin",
      "Disposal instructions",
      "Eco-friendly recycling",
    ],
  },
  {
    icon: "📊",
    title: "Detection History",
    badge: "Analytics",
    description:
      "View and manage all your previous waste detection records anytime.",
    highlights: [
      "Detection history",
      "View detailed results",
      "Delete old records",
    ],
  },
  {
    icon: "💡",
    title: "Creative Reuse Ideas",
    badge: "Innovation",
    description:
      "Discover simple ideas to reuse waste materials before disposing them.",
    highlights: [
      "Reuse suggestions",
      "Reduce waste",
      "Support sustainability",
    ],
  },
];

export default function Features() {
  const showToast = () =>
    toast.success("🚀 Coming Soon!", {
      style: {
        background: "#065f46",
        color: "#fff",
        borderRadius: "16px",
        padding: "16px",
      },
    });

  return (
    <Section
      id="features"
      className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white py-24"
    >
      {/* Background */}
      <div className="absolute -top-40 -left-32 h-[500px] w-[500px] rounded-full bg-emerald-300/20 blur-[140px]" />
      <div className="absolute top-20 right-0 h-[420px] w-[420px] rounded-full bg-green-300/20 blur-[120px]" />
      <div className="absolute top-80 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-emerald-200/20 blur-[160px]" />

      <div className="relative z-10">
        <SectionTitle
          badge="Features"
          title="Everything Needed for Smart Recycling"
          description="EcoVision AI combines artificial intelligence with recycling knowledge to make waste management simple."
        />

        <div className="mx-auto mt-20 grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
            whileHover={{
              y: -12,
              scale: 1.02,
            }}
              className="group relative flex min-h-[510px] flex-col justify-between overflow-hidden rounded-[32px] border border-emerald-100 bg-white/80 p-8 shadow-xl backdrop-blur-xl transition-all duration-500 hover:shadow-[0_30px_70px_rgba(16,185,129,.18)]"
            >
              {/* NEW */}
              <span className="absolute right-6 top-6 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-emerald-600 shadow">
                NEW
              </span>

              {/* Shine */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition duration-1000 group-hover:translate-x-full" />

              {/* Glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl transition duration-500 group-hover:scale-150" />

              <div>
                {/* Badge */}
                <div className="flex justify-center">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {feature.badge}
                  </span>
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{
                    y: -8,
                    rotate: 10,
                    scale: 1.08,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="mx-auto my-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-700 text-5xl text-white shadow-2xl"
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-center text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-4 min-h-[82px] text-center text-[15px] leading-7 text-slate-600">
                  {feature.description}
                </p>

                {/* Highlights */}
                <ul className="mt-8 space-y-3">
                  {feature.highlights.map((item) => (
                    <motion.li
                      key={item}
                      whileHover={{ x: 6 }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                      }}
                      className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 transition group-hover:bg-emerald-100"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                        ✓
                      </div>

                      <span className="text-sm text-slate-700">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

                {/* Footer */}
                <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
                  <motion.button
                    type="button"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast();
                    }}
                    className="relative z-20 font-semibold text-emerald-600"
                  >
                    Explore →
                  </motion.button>

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {feature.badge}
                  </span>
                </div>

              </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}