import Section from "./Section";

export default function TwoSectionsBox({ children, className, applyWidth = true, padVertical = false }) {
  return (
    <Section
      padVertical={padVertical}
      applyWidth={applyWidth}
      className={`flex flex-col gap-8 md:gap-10 lg:flex-row lg:items-center lg:gap-15 ${className}`}
    >
      {children}
    </Section>
  );
}
