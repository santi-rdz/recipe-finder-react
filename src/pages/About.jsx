import Main from "../components/Main";
import Section from "../components/Section";
import TwoSectionsBox from "../components/TwoSectionsBox";
import ImgHero from "../assets/images/image-about-our-mission-small.webp";
import ImgHeroLarge from "../assets/images/image-about-our-mission-large.webp";
import imgFam from "../assets/images/image-about-beyond-the-plate-small.webp";
import imgFamLarge from "../assets/images/image-about-beyond-the-plate-large.webp";
import arrowIcon from "../assets/images/icon-bullet-point.svg";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import Footer from "../components/CTA";
import BorderWrapper from "../components/BorderWrapper";

const aboutSections = [
  {
    title: "Why we exist",
    items: [
      {
        title: "Cut through the noise.",
        description:
          "The internet is bursting with recipes, yet most busy cooks still default to take-away or packaged foods. We curate a tight collection of fool-proof dishes so you can skip the scrolling and start cooking.",
      },
      {
        title: "Empower home kitchens.",
        description:
          "When you control what goes into your meals, you control how you feel. Every recipe is built around unrefined ingredients and ready in about half an hour of active prep.",
      },
      {
        title: "Make healthy look good.",
        description:
          "High-resolution imagery shows you exactly what success looks like—because we eat with our eyes first, and confidence matters.",
      },
    ],
  },
  {
    title: "Our food philosophy",
    items: [
      {
        title: "Whole ingredients first.",
        description: "Fresh produce, grains, legumes, herbs, and quality fats form the backbone of every recipe.",
      },
      {
        title: "Flavor without compromise.",
        description: "Spices, citrus, and natural sweetness replace excess salt, sugar, and additives.",
      },
      {
        title: "Respect for time.",
        description:
          "Weeknight meals should slot into real schedules; weekend cooking can be leisurely but never wasteful.",
      },
      {
        title: "Sustainable choices.",
        description:
          "Short ingredient lists cut down on food waste and carbon footprint, while plant-forward dishes keep things planet-friendly.",
      },
    ],
  },
];

export default function About() {
  return (
    <>
      <Main>
        <HeroSection />
        <DetailsAbout aboutSections={aboutSections[0]} />
        <DetailsAbout aboutSections={aboutSections[1]} />
        <BeyonSection />
      </Main>
      <Footer />
    </>
  );
}

function HeroSection() {
  return (
    <BorderWrapper>
      <TwoSectionsBox>
        <div className="flex-1/2 space-y-6">
          <span className="text-5 inline-block rounded-md bg-orange-500 p-1 font-bold">Our mission</span>
          <h1 className="text-2 animate-bounceUp font-extrabold">
            Help more people cook nourishing meals, more often.
          </h1>
          <blockquote className="text-6 flex flex-col gap-4 font-medium">
            <p style={{ animationDelay: "0.1s" }} className="animate-bounceUp">
              Healthy Recipe Finder was created to prove that healthy eating can be convenient, affordable, and
              genuinely delicious.
            </p>
            <p style={{ animationDelay: "0.2s" }} className="animate-bounceUp">
              We showcase quick, whole-food dishes that anyone can master—no fancy equipment, no ultra-processed
              shortcuts—just honest ingredients and straightforward steps.
            </p>
          </blockquote>
        </div>
        <div className="flex-1/2">
          <picture>
            <source media="(width >= 768px)" srcSet={ImgHeroLarge} />
            <img style={{ animationDelay: "0.1s" }} src={ImgHero} className="animate-zoomIn rounded-2xl" />
          </picture>
        </div>
      </TwoSectionsBox>
    </BorderWrapper>
  );
}

function DetailsAbout({ aboutSections }) {
  const { title, items } = aboutSections;
  const [refTitle, isTitleVisible] = useIntersectionObserver();

  return (
    <BorderWrapper>
      <Section className={`flex flex-col gap-10 pt-[clamp(4rem,3.2958rem+3.0047vw,6rem)] lg:flex-row`}>
        <h2
          className={`${isTitleVisible ? "animate-bounceUp" : ""} text-2 font-extrabold lg:min-w-[14ch]`}
          ref={refTitle}
        >
          {title}
        </h2>
        <ul className="space-y-6 md:space-y-8 lg:space-y-12">
          {items.map((item, i) => (
            <Item item={item} index={i} key={item.title} />
          ))}
        </ul>
      </Section>
    </BorderWrapper>
  );
}

function Item({ item, index }) {
  const [refItem, isItemVisible] = useIntersectionObserver();
  const { title, description } = item;
  return (
    <li
      style={{ animationDelay: `${index * 0.1}s` }}
      ref={refItem}
      className={`${isItemVisible ? "animate-bounceUp" : ""} flex gap-4`}
    >
      <img src={arrowIcon} className="self-start" />
      <div>
        <h3 className="text-4 font-bold">{title}</h3>
        <p className="text-6 font-medium">{description}</p>
      </div>
    </li>
  );
}
function BeyonSection() {
  const [refImg, isImgVisible] = useIntersectionObserver();
  const [refTitle, isTitleVisible] = useIntersectionObserver();
  return (
    <TwoSectionsBox padVertical={true}>
      <div className="flex-2/5 space-y-3">
        <h2 ref={refTitle} className={`${isTitleVisible ? "animate-bounceUp" : ""} text-2 font-extrabold`}>
          Beyond the plate
        </h2>
        <p className="text-6 font-medium">
          We believe food is a catalyst for community and well-being. By sharing approachable recipes, we hope to:
        </p>
        <ul className="text-6">
          <BeyonItem>Encourage family dinners and social cooking.</BeyonItem>
          <BeyonItem>Reduce reliance on single-use packaging and delivery waste.</BeyonItem>
          <BeyonItem>Spark curiosity about seasonal produce and local agriculture.</BeyonItem>
        </ul>
      </div>
      <div className="flex-3/4">
        <picture>
          <source media="(width >= 768px)" srcSet={imgFamLarge} />
          <img src={imgFam} ref={refImg} className={`${isImgVisible ? "animate-zoomIn" : ""} rounded-xl`} alt="" />
        </picture>
      </div>
    </TwoSectionsBox>
  );
}

function BeyonItem({ children }) {
  return (
    <li className="flex items-center">
      <span className="mt-3 mr-2 inline-block size-1.5 shrink-0 self-start rounded-full bg-neutral-900"></span>
      {children}
    </li>
  );
}
