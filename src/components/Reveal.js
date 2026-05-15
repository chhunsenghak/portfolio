import { motion } from "framer-motion";
import { ease, V, VP } from "../styles/theme";

export default function Reveal({ children, dir = "up", delay = 0 }) {
  return (
    <motion.div
      variants={V[dir] || V.up}
      initial="hidden"
      whileInView="visible"
      viewport={VP}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
