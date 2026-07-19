import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { getDetection } from "../../services/wasteService";


export default function HistoryDetailsModal({
  open,
  id,
  onClose,
}) {

  const [result, setResult] = useState(null);



  useEffect(() => {

    if (!id) return;


    const loadData = async () => {

      try {

        const response = await getDetection(id);

        console.log(
          "History Details Response:",
          response
        );

        setResult(response.data);

      } catch (error) {

        console.error(error);

      }

    };


    loadData();


  }, [id]);




  return (

    <AnimatePresence>


      {open && (

        <motion.div

          initial={{
            opacity:0
          }}

          animate={{
            opacity:1
          }}

          exit={{
            opacity:0
          }}

          className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/40
          px-6
          backdrop-blur-sm
          "
          onClick={onClose}
        >



          <motion.div

            initial={{
              opacity:0,
              scale:0.8,
              y:40
            }}

            animate={{
              opacity:1,
              scale:1,
              y:0
            }}

            exit={{
              opacity:0,
              scale:0.8
            }}

            transition={{
              duration:0.4
            }}

            onClick={(e)=>e.stopPropagation()}


            className="
            relative
            max-h-[90vh]
            w-full
            max-w-5xl
            overflow-y-auto
            rounded-[32px]
            border
            border-emerald-100
            bg-white/90
            p-8
            shadow-2xl
            backdrop-blur-xl
            "
          >



            {/* Close Button */}

            <button

              onClick={onClose}

              className="
              absolute
              right-6
              top-6
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-emerald-100
              text-xl
              text-emerald-700
              transition
              hover:scale-110
              "
            >
              ✕
            </button>





            {!result ? (

              <div
                className="
                py-20
                text-center
                text-xl
                font-semibold
                text-emerald-600
                "
              >
                Loading...
              </div>


            ) : (



              <>


                <h1
                  className="
                  bg-gradient-to-r
                  from-emerald-500
                  via-green-500
                  to-emerald-700
                  bg-clip-text
                  text-4xl
                  font-extrabold
                  text-transparent
                  "
                >
                  Detection Details
                </h1>




                <motion.div

                  animate={{
                    y:[0,-10,0]
                  }}

                  transition={{
                    duration:3,
                    repeat:Infinity
                  }}

                  className="
                  mt-8
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-3xl
                  bg-gradient-to-br
                  from-emerald-400
                  via-green-500
                  to-emerald-700
                  text-5xl
                  shadow-xl
                  "
                >
                  ♻️
                </motion.div>




                <div
                  className="
                  mt-10
                  grid
                  gap-5
                  md:grid-cols-2
                  "
                >


                  <DetailCard
                    title="Object"
                    value={result.object_name}
                  />


                  <DetailCard
                    title="Category"
                    value={result.waste_category}
                  />


                  <DetailCard
                    title="Confidence"
                    value={result.confidence}
                  />


                  <DetailCard
                    title="Recyclable"
                    value={
                      result.recyclable
                      ? "Yes"
                      : "No"
                    }
                  />


                  <DetailCard
                    title="Bin"
                    value={result.bin}
                  />


                  <DetailCard
                    title="Instructions"
                    value={result.recycling_instructions}
                  />


                  <DetailCard
                    title="Reuse Ideas"
                    value={result.reuse_ideas}
                  />


                  <DetailCard
                    title="Environmental Impact"
                    value={result.environmental_impact}
                  />


                </div>


              </>

            )}


          </motion.div>


        </motion.div>

      )}


    </AnimatePresence>

  );

}





function DetailCard({
  title,
  value
}) {


  return (

    <motion.div

      whileHover={{
        y:-6
      }}

      className="
      rounded-2xl
      border
      border-emerald-100
      bg-emerald-50/60
      p-5
      transition
      hover:bg-emerald-100
      hover:shadow-lg
      "
    >


      <h3
        className="
        text-sm
        font-bold
        uppercase
        tracking-wider
        text-emerald-600
        "
      >
        {title}
      </h3>


      <p
        className="
        mt-3
        leading-7
        text-slate-700
        "
      >
        {value || "Not Available"}
      </p>


    </motion.div>

  );

}