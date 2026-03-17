import { motion } from "framer-motion";
import { MapPin, Bell, Droplet } from "lucide-react";

const steps = [
  {
    icon: <MapPin size={32} className="text-red-500" />,
    title: "Create Request",
    text: "Patient creates a blood request with location and urgency.",
  },
  {
    icon: <Bell size={32} className="text-red-500" />,
    title: "Notify Donors",
    text: "Nearby verified donors instantly receive notifications.",
  },
  {
    icon: <Droplet size={32} className="text-red-500" />,
    title: "Save Lives",
    text: "Donor accepts request and navigates to hospital.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="px-6 md:px-16 py-24 bg-gradient-to-b from-white to-gray-50">

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
        How <span className="text-red-500">LifeLine</span> Works
      </h2>

      <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
        A simple, fast, and reliable process designed to connect donors and patients in real-time.
      </p>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-10">

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl text-center shadow-md border border-gray-100 hover:shadow-xl transition"
          >

            {/* Icon */}
            <div className="mb-5 flex justify-center">
              <div className="bg-red-100 p-4 rounded-full">
                {step.icon}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {step.title}
            </h3>

            {/* Text */}
            <p className="text-gray-500 text-sm leading-relaxed">
              {step.text}
            </p>

          </motion.div>
        ))}

      </div>

    </section>
  );
};

export default HowItWorks;