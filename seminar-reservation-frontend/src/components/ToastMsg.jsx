import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ToastMsg = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically close the toast after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Close the toast
    }, 4000);

    return () => clearTimeout(timer); // Clean up the timer
  }, [message, onClose]);

  if (!isVisible) return null;

  return (
    <motion.div
      className={`toast toast-center toast-bottom z-50`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={`alert alert-${type || "info"} shadow-lg`}>
        <div>
          <span>{message}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ToastMsg;
