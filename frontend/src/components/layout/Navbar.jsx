import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import Container from "../common/Container";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const goToSection = (sectionId) => {
    navigate("/");

    setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setMobileMenu(false);
    }, 300);
  };

    useEffect(() => {
      let lastScroll = 0;

      const handleScroll = () => {
        const currentScroll = window.scrollY;

        const features = document.getElementById("features");

        if (!features) return;

        const featureTop = features.offsetTop - 100;

        if (currentScroll < featureTop) {
          setShowNavbar(true);
        } else {
          if (currentScroll > lastScroll) {
            setShowNavbar(false);
          } else {
            setShowNavbar(true);
          }
        }

        lastScroll = currentScroll;
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}

        animate={{
          y: showNavbar ? 0 : -120,
          opacity: showNavbar ? 1 : 0,
        }}

        transition={{
          duration: 0.35,
          ease: "easeInOut",
        }}
        className="fixed inset-x-0 top-4 z-50"
      >
        <Container>
            <div className="flex h-20 w-full items-center justify-between rounded-2xl border border-white/50 bg-white/75 px-6 shadow-[0_10px_40px_rgba(0,0,0,.08)] backdrop-blur-2xl">

            {/* Logo */}
            <motion.div
              whileHover={{
                scale: 1.04,
              }}
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg">
                <Leaf size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight text-emerald-600">
                  EcoVision AI
                </h1>

                <p className="-mt-1 text-xs font-medium tracking-widest text-slate-400 uppercase">
                  Smart Recycling
                </p>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <nav className="hidden items-center gap-2 lg:flex">

              <Link
                to="/"
                className="rounded-xl px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600"
              >
                Home
              </Link>

              <Link
                to="/history"
                className="rounded-xl px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600"
              >
                History
              </Link>

              <button
                onClick={() => goToSection("features")}
                className="rounded-xl px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600"
              >
                Features
              </button>

              <button
                onClick={() => goToSection("how-it-works")}
                className="rounded-xl px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600"
              >
                How It Works
              </button>

              <button
                onClick={() => goToSection("about")}
                className="rounded-xl px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600"
              >
                About
              </button>

              <Link
                to="/upload"
                className="ml-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_40px_rgba(16,185,129,.35)]"
              >
                Upload
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow lg:hidden"
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </Container>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="fixed left-4 right-4 top-28 z-50 overflow-hidden rounded-3xl border border-white/50 bg-white/90 p-6 shadow-[0_25px_60px_rgba(0,0,0,.15)] backdrop-blur-2xl lg:hidden"
            >
              <div className="flex flex-col gap-3">

                <Link
                  to="/"
                  onClick={() => setMobileMenu(false)}
                  className="rounded-2xl px-5 py-4 font-semibold text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  🏠 Home
                </Link>

                <Link
                  to="/history"
                  onClick={() => setMobileMenu(false)}
                  className="rounded-2xl px-5 py-4 font-semibold text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  📊 History
                </Link>

                <button
                  onClick={() => goToSection("features")}
                  className="rounded-2xl px-5 py-4 text-left font-semibold text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  ✨ Features
                </button>

                <button
                  onClick={() => goToSection("how-it-works")}
                  className="rounded-2xl px-5 py-4 text-left font-semibold text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  ⚙️ How It Works
                </button>

                <button
                  onClick={() => goToSection("about")}
                  className="rounded-2xl px-5 py-4 text-left font-semibold text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  🌱 About
                </button>

                <Link
                  to="/upload"
                  onClick={() => setMobileMenu(false)}
                  className="mt-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4 text-center font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  🚀 Upload Waste
                </Link>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}