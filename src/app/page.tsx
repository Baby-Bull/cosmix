import GlassCard from "@/components/sub-components/cards/GlassCard";
import FlyingAstro from "@/components/sub-components/FlyingAstro";

export default function Home() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <FlyingAstro />
      </div>
      <div style={{ flex: 1 }}>
        <GlassCard />
      </div>
    </div>
  );
}
