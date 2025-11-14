"use client";
import { useEffect, useState } from "react";

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16.6); // ~60fps

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setCount(Math.floor(start));
    }, 16.6);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}</span>;
};

export default CountUp;
