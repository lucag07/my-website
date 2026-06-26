import { useEffect, useState, useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const metrics = [
  { value: 70, suffix: "%", label: "of Local Calls Go to the Top 3" },
  { value: 90, suffix: "-Day", label: "Average to Results" },
  { value: 3, suffix: " Top", label: "Positions Targeted" },
];

function AnimatedCounter({
  end,
  suffix,
  duration = 1500,
}: {
  end: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref}>
      <span className="text-4xl md:text-5xl font-bold text-amber-400">
        {count}
        {suffix}
      </span>
    </div>
  );
}

export function MetricsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-slate-900 py-16 md:py-20">
      <div
        ref={ref}
        className={`${isVisible ? "reveal-visible" : "reveal-base"} max-w-6xl mx-auto px-6`}
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <AnimatedCounter end={metric.value} suffix={metric.suffix} />
              <p className="mt-2 text-slate-400 text-sm font-medium">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
