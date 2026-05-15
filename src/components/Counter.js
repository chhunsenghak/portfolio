import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function Counter({ target }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = target / (1500 / 16);
    const t = setInterval(() => {
      v = Math.min(v + step, target);
      setVal(Math.floor(v));
      if (v >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {val}
      {val >= target ? "+" : ""}
    </span>
  );
}
