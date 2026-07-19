import { Link } from "react-router-dom";
import Container from "../common/Container";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 pt-20">

      {/* Background Grid */}
      <div className="absolute inset-0 -z-30 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle,#0f172a 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Floating Background */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute -left-20 top-20 -z-20 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl"
      />

      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 14 }}
        className="absolute right-0 bottom-0 -z-20 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl"
      />

      <Container>

        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-16">

          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* Badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="inline-flex rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700 shadow"
            >
              🤖 AI Powered Waste Segregation
            </motion.div>

            {/* Heading */}
            <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
              Smart Waste Detection

              <span className="block bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                with EcoVision AI
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg md:text-xl">
              Upload an image of waste and instantly receive AI-powered waste
              classification, recycling guidance, reuse ideas and environmental
              impact in just a few seconds.
            </p>

            {/* Buttons */}
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <Link
                to="/upload"
                className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
              >
                Detect Waste →
              </Link>

              <Link
                to="/history"
                className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 shadow transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 hover:shadow-xl"
              >
                View History
              </Link>

            </div>

            {/* Scroll */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-16 text-sm font-medium text-slate-500"
            >
              ↓ Scroll to Explore
            </motion.div>

          </motion.div>

        </div>

      </Container>
    </section>
  );
}