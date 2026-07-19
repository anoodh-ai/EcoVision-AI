import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Trash2 } from "lucide-react";

import HistoryDetailsModal from "../components/ui/HistoryDetailsModal";
import {
  getHistory,
  deleteDetection,
} from "../services/wasteService";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const { data } = await getHistory();
      setHistory(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDetection(id);

      setHistory((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white pt-32">

      {/* Background */}
      <div className="absolute -top-40 -left-32 h-[500px] w-[500px] rounded-full bg-emerald-300/20 blur-[140px]" />
      <div className="absolute top-20 right-0 h-[420px] w-[420px] rounded-full bg-green-300/20 blur-[120px]" />
      <div className="absolute bottom-0 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-emerald-200/20 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
          className="rounded-[32px] border border-emerald-100 bg-white/80 p-10 shadow-xl backdrop-blur-xl"
        >

          {/* Header */}
          <div>
            <h1 className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-700 bg-clip-text text-5xl font-extrabold text-transparent">
              Detection History
            </h1>

            <p className="mt-3 text-lg text-slate-600">
              Total Records
              <span className="ml-2 font-bold text-emerald-600">
                {history.length}
              </span>
            </p>
          </div>

          {history.length === 0 ? (

            <motion.div
              initial={{ opacity: 0, scale: .95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 rounded-3xl border-2 border-dashed border-emerald-200 bg-white p-14 text-center"
            >

              <div className="text-6xl">♻️</div>

              <h2 className="mt-5 text-3xl font-bold text-slate-700">
                No Detection History
              </h2>

              <p className="mt-3 text-slate-500">
                Analyze an image to create your first history record.
              </p>

            </motion.div>

          ) : (

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              <AnimatePresence>

                {history.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -8 }}
                    className="group relative overflow-hidden rounded-[28px] border border-emerald-100 bg-white p-8 shadow-lg transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl"
                  >
                    {/* Top Glow */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

                    {/* Buttons */}
                    <div className="absolute right-5 top-5 flex gap-2">

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(item.id);
                          setOpenModal(true);
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition hover:bg-emerald-500 hover:text-white"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 transition hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        rotate: 8,
                        scale: 1.08,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                      }}
                      className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 text-4xl text-white shadow-lg"
                    >
                      🧠
                    </motion.div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-slate-900">
                      {item.object_name}
                    </h2>

                    {/* Info */}
                    <div className="mt-7 space-y-3">

                      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                        <span className="text-slate-500">
                          Category
                        </span>

                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                          {item.waste_category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                        <span className="text-slate-500">
                          Confidence
                        </span>

                        <span className="font-semibold text-slate-900">
                          {item.confidence}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                        <span className="text-slate-500">
                          Bin
                        </span>

                        <span className="font-semibold text-slate-900">
                          {item.bin}
                        </span>
                      </div>

                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>

            </div>

          )}

        </motion.div>
      </div>

      <HistoryDetailsModal
        open={openModal}
        id={selectedId}
        onClose={() => {
          setOpenModal(false);
          setSelectedId(null);
        }}
      />

    </main>
  );
}