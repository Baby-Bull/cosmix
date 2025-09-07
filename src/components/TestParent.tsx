"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll("[data-speed]");
    if (!elements) return;

    elements.forEach((el) => {
      const speed = parseFloat(el.getAttribute("data-speed") || "1");

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
    <div
      ref={containerRef}
      style={{
        height: "300vh",
        background: "#111",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h1 style={{ textAlign: "center", padding: "50px 0" }}>
        Scroll xuống để thấy hiệu ứng parallax
      </h1>

      <div
        data-speed="0.2"
        style={{
          position: "absolute",
          top: "30%",
          left: "20%",
          fontSize: "2rem",
        }}
      >
        Speed 0.2 (chậm hơn)
      </div>

      <div
        data-speed="0.6"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          fontSize: "2rem",
        }}
      >
        Speed 0.6 (nhanh hơn)
      </div>

      <div
        data-speed="-0.3"
        style={{
          position: "absolute",
          top: "70%",
          left: "30%",
          fontSize: "2rem",
        }}
      >
        Speed -0.3 (ngược hướng)
      </div>
    </div>
  );
};

export default ParallaxScroll;
