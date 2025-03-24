import { motion } from "framer-motion";

export default function FadeInWrapper({
  className,
  children,
  delay = 0,
  y = 0,
  x = 0,
  animatex = 0,
  animatey = 0,
  opacity = 0,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity, y, x }}
      whileInView={{
        opacity: 1,
        y: animatey,
        x: animatex,
        transition: { duration: delay },
        ease: "easeOut",
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
