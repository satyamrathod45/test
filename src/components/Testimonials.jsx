import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Patient's Relative",
    text: "We found a donor within 7 minutes. LifeLine literally saved my father's life.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Anjali Verma",
    role: "Blood Donor",
    text: "I received an alert and reached the hospital in minutes. Best feeling ever.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Dr. Mehta",
    role: "Hospital Staff",
    text: "This platform reduces emergency response time drastically. A game changer.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-6 md:px-16 bg-gradient-to-b from-gray-50 to-white">

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
      >
        Real Stories. <span className="text-red-500">Real Impact.</span>
      </motion.h2>

      <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
        Hear from people whose lives were changed through LifeLine.
      </p>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT: VIDEO */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            controls
            className="w-full h-[300px] object-cover"
          />
        </motion.div>

        {/* RIGHT: TESTIMONIAL CARDS */}
        <div className="space-y-6">

          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md flex gap-4 items-start hover:shadow-xl transition"
            >

              {/* Image */}
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-red-100"
              />

              {/* Content */}
              <div>
                <p className="text-gray-600 text-sm mb-2">“{t.text}”</p>

                <h4 className="font-semibold text-gray-800">
                  {t.name}
                </h4>

                <span className="text-xs text-red-500">
                  {t.role}
                </span>
              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;