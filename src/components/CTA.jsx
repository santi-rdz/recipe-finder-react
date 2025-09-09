import Section from "./Section";
import Footer from "./Footer";

import ButtonCTA from "./ButtonCTA";
import forkIcon from "../assets/images/pattern-fork.svg";
import knifeIcon from "../assets/images/pattern-knife.svg";

import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export default function CTA() {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <Section ref={ref} className={`${isVisible ? "animate-reavealUp" : ""} space-y-10 pb-20 text-center`}>
      <div className="relative z-10 space-y-8 overflow-hidden rounded-2xl bg-neutral-200 p-10 md:p-14 lg:space-y-10 xl:p-24">
        <div className="space-y-3">
          <h2 className="text-2 font-bold">Ready to cook smarter?</h2>
          <p className="text-6">Hit the button, pick a recipe, and get dinner on the table—fast.</p>
          <img
            src={knifeIcon}
            className="absolute -top-10 -right-10 -z-10 h-40 md:h-46 lg:top-7 lg:-right-16 lg:h-full"
          />
          <img src={forkIcon} className="absolute -bottom-10 -left-10 -z-10 h-40 md:h-46 lg:h-full" />
        </div>
        <ButtonCTA to="/recipes" className="inline-block py-3">
          Browse recipes
        </ButtonCTA>
      </div>
      <Footer />
    </Section>
  );
}
