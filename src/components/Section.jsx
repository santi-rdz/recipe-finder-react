export default function Section({ className, children, ref, applyWidth = true, padVertical = false }) {
  return (
    <section
      ref={ref}
      className={`${className} ${applyWidth ? "md-container" : ""} ${padVertical ? "py-[clamp(4rem,3.2958rem+3.0047vw,6rem)]" : "pb-[clamp(4rem,3.2958rem+3.0047vw,6rem)]"}`}
    >
      {children}
    </section>
  );
}
