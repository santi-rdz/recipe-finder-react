import ButtonCTA from "../components/ButtonCTA";
import Main from "../components/Main";
import CtaImg from "../assets/images/image-home-hero-small.webp";
import CtaImgLarge from "../assets/images/image-home-hero-large.webp";
import Section from "../components/Section";
import carrotIcon from "../assets/images/icon-whole-food-recipes.svg";
import minimunIcon from "../assets/images/icon-minimum-fuss.svg";
import serchIcon from "../assets/images/icon-search-in-seconds.svg";
import realLifeImg from "../assets/images/image-home-real-life-small.webp";
import realLifeImgLarge from "../assets/images/image-home-real-life-large.webp";
import TextHighlight from "../components/TextHighlight";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import TwoSectionsBox from "../components/TwoSectionsBox";
import Footer from "../components/CTA";

const features = [
  { icon: carrotIcon, title: "Whole-food recipes", description: "Each dish uses everyday, unprocessed ingredients." },
  {
    icon: minimunIcon,
    title: "Minimun fuss",
    description: "All recipes are designed to make eating healthy quick and easy.",
  },
  {
    icon: serchIcon,
    title: "Search in seconds",
    description: "Filter by name or ingredient and jump straight to the recipe you need.",
    layout: "md:col-span-2 xl:col-span-1",
  },
];

export default function HomePage() {
  return (
    <>
      <Main>
        <HeroSection />
        <FeatureSection />
        <RealLifeSection />
      </Main>
      <Footer />
    </>
  );
}

function HeroSection() {
  return (
    <div className="">
      <Section className="relative z-10 space-y-10 lg:space-y-16" applyWidth={false}>
        <header className="md-container space-y-4 lg:text-center">
          <h1 className="text-1 te animate-bounceUp font-extrabold">
            <TextHighlight className="after:bottom-3" color="bg-orange-500/50">
              Healthy
            </TextHighlight>{" "}
            meals, zero fuss
          </h1>
          <p style={{ animationDelay: "0.1s" }} className="text-6 animate-bounceUp font-medium text-balance">
            Discover eight quick, whole-food recipes that you can cook tonight <br className="hidden lg:block" /> —no
            processed junk, no guesswork.
          </p>
          <ButtonCTA
            style={{ animationDelay: "0.2s" }}
            to="recipes"
            className="animate-bounceUp mt-4 inline-block py-3"
          >
            Start exploring
          </ButtonCTA>
        </header>
        <picture className="hero after:animate-fadeUp-alter relative block">
          <source media="(width >= 768px)" srcSet={CtaImgLarge} />
          <img
            src={CtaImg}
            style={{ animationDelay: "0.3s" }}
            className="animate-zoomIn md-container ring-neutral-0 z-10 rounded-xl ring-6 md:ring-8 lg:ring-14"
            alt=""
          />
        </picture>
      </Section>
    </div>
  );
}

function FeatureSection() {
  return (
    <Section className="space-y-8 xl:space-y-12">
      <h2 className="text-2 text-center font-extrabold">What you’ll get</h2>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center lg:gap-8 xl:grid-cols-3">
        {features.map((f, i) => (
          <FeautureItem feature={f} key={f.title} index={i} />
        ))}
      </ul>
    </Section>
  );
}

function FeautureItem({ feature: { icon, title, description, layout }, index }) {
  const [ref, isVisible] = useIntersectionObserver({ treshold: 1 });

  return (
    <li
      style={{ animationDelay: `${index * 0.2}s` }}
      ref={ref}
      className={`space-y-3 ${layout} ${isVisible ? "animate-fadeUp" : ""} md max-w-96 md:flex md:flex-col md:items-center md:text-center md:text-balance`}
    >
      <div className="grid size-16 place-items-center rounded-xl bg-white shadow-xs">
        <img src={icon} alt="" className="inline-block" />
      </div>
      <h3 className="text-3 mt-3 font-bold">{title}</h3>
      <p className="text-6 font-medium">{description}</p>
    </li>
  );
}

function RealLifeSection() {
  const [titleRef, isTitleVisible] = useIntersectionObserver({ threshold: 0 });
  const [imgRef, isImgVisible] = useIntersectionObserver({ threshold: 0 });

  return (
    <TwoSectionsBox className="flex flex-col gap-8 md:gap-10 lg:flex-row lg:items-center lg:gap-15">
      <div className="lg:flex-3/4">
        <h2 className={`${isTitleVisible ? "animate-fadeUp" : ""} text-2 font-extrabold`} ref={titleRef}>
          Built for real life
        </h2>
        <blockquote className="mt-4 flex flex-col gap-[1lh]">
          <p className="text-6">
            Cooking shouldn’t be complicated. These recipes come in under{" "}
            <TextHighlight className="font-bold after:bottom-1.5" color="bg-orange-500">
              30 minutes
            </TextHighlight>{" "}
            of active time, fit busy schedules, and taste good enough to repeat.{" "}
          </p>
          <p className="text-6">Whether you’re new to the kitchen or just need fresh ideas, we’ve got you covered.</p>
        </blockquote>
      </div>
      <div className="">
        <picture>
          <source media="(width >= 768px)" srcSet={realLifeImgLarge} />
          <img src={realLifeImg} ref={imgRef} className={`${isImgVisible ? "animate-zoomIn" : ""} rounded-xl`} />
        </picture>
      </div>
    </TwoSectionsBox>
  );
}
