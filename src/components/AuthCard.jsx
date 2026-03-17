import { motion } from "framer-motion";
import React from "react";

const AuthCard = ({ children, title }) => {

  return (

    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-[#1e293b] text-white p-8 rounded-xl shadow-xl w-96"
    >

      <h2 className="text-2xl mb-6 text-center">
        {title}
      </h2>

      {children}

    </motion.div>

  );

};

export default AuthCard;