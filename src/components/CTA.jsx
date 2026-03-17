import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="relative py-24 px-6 md:px-16 bg-gradient-to-br from-red-700 via-red-600 to-rose-500 overflow-hidden">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE CONTENT */}
        <div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Be the Reason <br />
            <span className="text-yellow-200">Someone Lives Today</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-red-100 text-lg mb-8 max-w-lg"
          >
            Join LifeLine and become part of a real-time emergency network.
            Your one decision can save multiple lives instantly.
          </motion.p>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap">

            <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-100 transition">
              Register as Donor →
            </button>

            <button className="border border-white px-6 py-3 rounded-xl text-white hover:bg-white hover:text-red-600 transition">
              Request Blood
            </button>

          </div>

        </div>


        {/* RIGHT SIDE MEDIA */}
        <div className="relative flex justify-center">

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-white/20"
          >
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              autoPlay
              loop
              muted
              className="w-[400px] h-[250px] object-cover"
            />
          </motion.div>

          {/* Floating Image Card */}
          <motion.img
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            src="https://images.unsplash.com/photo-1584515933487-779824d29309"
            alt="doctor"
            className="absolute -bottom-10 -left-10 w-40 h-40 object-cover rounded-xl shadow-lg border-4 border-white"
          />

          {/* Floating Badge */}
          <div className="absolute -top-6 right-0 bg-white text-red-600 px-4 py-2 rounded-full text-sm font-semibold shadow">
            ❤️ Live Donations Happening
          </div>

        </div>

      </div>

    </section>
  );
};

export default CTA;