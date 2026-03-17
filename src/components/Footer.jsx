import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-red-100 px-6 md:px-16 pt-16 pb-8">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            LifeLine ❤️
          </h2>

          <p className="text-red-200 text-sm mb-4">
            Connecting blood donors with patients in real-time.  
            Saving lives through technology and community.
          </p>

          <div className="flex items-center gap-2 text-yellow-300 text-sm">
            <Heart size={16} />
            Built to save lives
          </div>
        </div>


        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-300 cursor-pointer transition">Home</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">How It Works</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Find Donors</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Register</li>
          </ul>
        </div>


        {/* RESOURCES */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-300 cursor-pointer transition">FAQs</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Terms & Conditions</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Support</li>
          </ul>
        </div>


        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>

          <div className="space-y-3 text-sm">

            <div className="flex items-center gap-2">
              <Mail size={16} />
              support@lifeline.com
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              +91 98765 43210
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              Nagpur, India
            </div>

          </div>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-red-700 mt-12 pt-6 text-center text-sm text-red-200">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          © {new Date().getFullYear()} LifeLine. All rights reserved.  
          <span className="text-yellow-300"> Saving Lives, One Drop at a Time ❤️</span>
        </motion.p>

      </div>

    </footer>
  );
};

export default Footer;