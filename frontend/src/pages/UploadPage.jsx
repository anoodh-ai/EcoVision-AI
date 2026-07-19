import { motion } from "framer-motion";
import ImageUpload from "../components/ui/ImageUpload";

export default function UploadPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 pt-28">
      {/* Background Glow */}
      <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-emerald-300/20 blur-[140px]" />
      <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-300/20 blur-[130px]" />

      {/* Grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle,#0f172a 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid w-full overflow-hidden rounded-[40px] border border-white/40 bg-white/70 shadow-[0_25px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:grid-cols-2"
        >
          {/* LEFT */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <span className="inline-flex w-fit items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              🤖 AI Waste Detection
            </span>

            <h1 className="mt-8 text-4xl font-black leading-tight text-slate-900 md:text-5xl">
              Upload Waste
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                Image
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
              Choose a waste image to start AI detection.
            </p>

            <div className="mt-10 space-y-4">
              <Feature
                icon="⚡"
                title="Fast Detection"
                text="AI detects waste instantly."
              />

              <Feature
                icon="♻️"
                title="Smart Recycling"
                text="Get recycling guidance."
              />

              <Feature
                icon="🌍"
                title="Eco Friendly"
                text="Promote sustainable disposal."
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex items-center justify-center bg-gradient-to-br from-white/70 to-emerald-50 p-6 sm:p-10 lg:p-16">

            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl"
            >
              <h2 className="mb-2 text-center text-2xl font-bold text-slate-900">
                Drag & Drop
              </h2>

              <p className="mb-8 text-center text-slate-500">
                Upload your waste image for AI analysis
              </p>

              {/* Existing Component - No Logic Changed */}
              <ImageUpload />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{
        x: 6,
      }}
      className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">{text}</p>
      </div>
    </motion.div>
  );
}