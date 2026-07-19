import { motion } from "framer-motion";
import ResultCard from "./ResultCard";

export default function DetectionModal({
  open,
  onClose,
  result,
  preview,
}) {
  if (!open || !result) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.85,
        y: 40,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      transition={{
        duration: 0.35,
        type: "spring",
        stiffness: 140,
      }}
      className="
        relative
        w-full
        max-w-6xl
        max-h-[90vh]
        overflow-y-auto
        rounded-[36px]
        bg-white
        shadow-[0_40px_120px_rgba(0,0,0,.35)]
      "
    >

      {/* Background Glow */}

      <div
        className="
          absolute
          -left-20
          -top-20
          h-72
          w-72
          rounded-full
          bg-emerald-300/20
          blur-[120px]
        "
      />

      <div
        className="
          absolute
          -bottom-20
          -right-20
          h-72
          w-72
          rounded-full
          bg-green-300/20
          blur-[120px]
        "
      />


      {/* Header */}

      <div
        className="
          relative
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          bg-gradient-to-r
          from-emerald-500
          to-green-600
          px-8
          py-6
        "
      >

        <div>
          <h2 className="text-3xl font-black text-white">
            Detection Complete
          </h2>

          <p className="mt-2 text-emerald-100">
            EcoVision AI analyzed your uploaded image successfully.
          </p>
        </div>


        <button
          onClick={onClose}
          className="
            absolute
            right-6
            top-6
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-2xl
            font-bold
            text-slate-700
            transition
            hover:bg-red-500
            hover:text-white
          "
        >
          ✕
        </button>

      </div>



      {/* Body */}

      <div className="relative p-8">

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">


          {/* Uploaded Image */}

          <motion.div
            initial={{
              opacity:0,
              x:-30
            }}
            animate={{
              opacity:1,
              x:0
            }}
            transition={{
              duration:0.5
            }}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-slate-50
              p-6
            "
          >

            <h3 className="mb-5 text-xl font-bold text-slate-900">
              Uploaded Image
            </h3>


            <img
              src={preview}
              alt="Uploaded"
              className="
                w-full
                rounded-3xl
                shadow-xl
              "
            />


            <div
              className="
                mt-6
                rounded-2xl
                bg-emerald-50
                p-5
              "
            >

              <div className="flex items-center gap-3">

                <div className="text-4xl">
                  ✅
                </div>


                <div>

                  <h4 className="font-bold text-emerald-700">
                    Analysis Successful
                  </h4>

                  <p className="mt-1 text-sm text-emerald-600">
                    Your waste image has been analyzed by EcoVision AI.
                  </p>

                </div>

              </div>

            </div>


          </motion.div>




          {/* Result Cards */}

          <motion.div
            initial={{
              opacity:0,
              x:30
            }}
            animate={{
              opacity:1,
              x:0
            }}
            transition={{
              duration:0.5
            }}
            className="
              grid
              gap-5
              md:grid-cols-2
            "
          >


            <ResultCard
              title="Detected Object"
              icon="🗑️"
              value={result.object_name}
            />


            <ResultCard
              title="Waste Category"
              icon="♻️"
              value={result.waste_category}
              badge
            />


            <ResultCard
              title="Confidence"
              icon="📊"
              value={result.confidence * 100}
              progress
            />


            <ResultCard
              title="Recyclable"
              icon="✅"
              value={result.recyclable ? "Yes" : "No"}
              success={result.recyclable}
              badge
            />


            <ResultCard
              title="Recycling Bin"
              icon="🟩"
              value={result.bin}
            />


            <ResultCard
              title="Reuse Ideas"
              icon="💡"
              value={result.reuse_ideas}
            />


            <ResultCard
              title="Instructions"
              icon="📋"
              value={result.recycling_instructions}
            />


            <ResultCard
              title="Environmental Impact"
              icon="🌍"
              value={result.environmental_impact}
            />


          </motion.div>


        </div>




        {/* Footer */}

        <div
          className="
            mt-10
            flex
            flex-col
            gap-4
            border-t
            border-slate-200
            pt-8
            sm:flex-row
            sm:justify-end
          "
        >

          <button
            onClick={onClose}
            className="
              rounded-2xl
              border
              border-slate-300
              bg-white
              px-7
              py-3
              font-semibold
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            Close
          </button>


          <button
            onClick={() => {
              onClose();
              window.location.href="/history";
            }}
            className="
              rounded-2xl
              bg-gradient-to-r
              from-emerald-500
              to-green-600
              px-7
              py-3
              font-semibold
              text-white
              shadow-lg
              transition
              hover:scale-105
            "
          >
            View History
          </button>


        </div>


      </div>


    </motion.div>
  );
}