"use client";
import React, { useEffect, useState } from "react";

interface DecodeTextProps {
  text: string;
  interval?: number; // thời gian delay mỗi ký tự
}

const DecodeText: React.FC<DecodeTextProps> = ({ text, interval = 80 }) => {
  const [displayed, setDisplayed] = useState<string[]>(Array(text.length).fill(""));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let i = 0;
    const current = Array(text.length).fill("");

    const timer = setInterval(() => {
      if (i < text.length) {
        // Random ký tự 0/1 tại vị trí i
        current[i] = Math.random() > 0.5 ? "0" : "1";
        setDisplayed([...current]);
        setCurrentIndex(i);

        // Sau một khoảng ngắn thì gán ký tự thật
        setTimeout(() => {
          current[i] = text[i];
          setDisplayed([...current]);
          i++;
        }, interval / 1.5);
      } else {
        clearInterval(timer);
        setCurrentIndex(-1); // bỏ underline khi xong
      }
    }, interval);

    return () => clearInterval(timer);
  }, [text, interval]);

  return (
    <span className="font-mono text-2xl text-green-400 tracking-wide">
      {displayed.map((char, idx) => (
        <span
          key={idx}
          className={
            idx === currentIndex
              ? "border-b-2 border-green-400 pb-1"
              : ""
          }
        >
          {char || " "}
        </span>
      ))}
    </span>
  );
};

export default DecodeText;
