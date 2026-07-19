import { motion } from "framer-motion";

export default function ResultCard({
  title,
  value,
  success = false,
  progress = false,
  badge = false,
  icon = "✨",
}) {
  const percentage = progress ? Number(value) : 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      whileHover={{
        scale: 1.05,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-lg
        transition-all
        duration-300
        hover:shadow-2xl
      "
    >
      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-300/20 blur-3xl transition duration-500 group-hover:scale-150" />

      {/* Icon */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-2xl text-white shadow-lg">
          {icon}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            {title}
          </p>

          {!badge && (
            <h3 className="mt-2 break-words text-xl font-bold text-slate-900">
              {value}
            </h3>
          )}
        </div>
      </div>

      {/* Badge */}
      {badge && (
        <div className="mt-5">
          <span
            className={`inline-flex rounded-full px-5 py-2 text-sm font-bold ${
              success
                ? "bg-emerald-100 text-emerald-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {value}
          </span>
        </div>
      )}

      {/* Progress */}
      {progress && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Confidence Score
            </span>

            <span className="font-bold text-emerald-600">
              {percentage.toFixed(1)}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${percentage}%`,
              }}
              transition={{
                duration: 1,
              }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600"
            />
          </div>
        </div>
      )}

      {/* Bottom line */}
      <div className="mt-6 border-t border-slate-100 pt-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          EcoVision AI
        </p>
      </div>
    </motion.div>
  );
}