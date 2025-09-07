"use client";
import DataSpeedComponent from "@/components/sub-components/animations/DataSpeedComponent";
import GlassCard from "@/components/sub-components/cards/GlassCard";
import FlyingAstro from "@/components/sub-components/FlyingAstro";
import ParallaxScroll from "@/components/TestParent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll("[data-speed]");
    if (!elements) return;

    elements.forEach((el) => {
      const speed = parseFloat(el.getAttribute("data-speed") || "1");
      console.log(speed);

      gsap.to(el, {
        y: () => `${window.innerHeight * speed}`, // di chuyển phụ thuộc viewport
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true, // bám theo scroll
        },
      });
    });
  }, []);
  return (
    <div className="">
      <div>
        <FlyingAstro />
      </div>
      <div className="relative" style={{ height: "200vh" }} ref={containerRef}>
        <DataSpeedComponent />
      </div>
      {/* <ParallaxScroll /> */}
    </div>
  );
}
