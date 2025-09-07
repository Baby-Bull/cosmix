import GlassCard from "../cards/GlassCard";

const DataSpeedComponent = () => {
  return (
    <div
      data-speed="0.4"
      style={{
        position: "absolute",
        top: "10%",
        right: "10%",
        fontSize: "2rem",
      }}
    >
      <GlassCard />
    </div>
  );
};

export default DataSpeedComponent;
