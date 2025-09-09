import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useState } from "react";

import MetaData from "./MetaData";
import ButtonCTA from "../components/ButtonCTA";

import servingIcon from "../assets/images/icon-servings.svg";
import clockIcon from "../assets/images/icon-prep-time.svg";
import cookIcon from "../assets/images/icon-cook-time.svg";
import useRecipeContext from "../hooks/useRecipeContext";

export default function Recipe({ recipe, activeView = "grid", index }) {
  const { setCurrRecipe } = useRecipeContext();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  //prettier-ignore
  const { id, image: { large }, overview, prepMinutes, cookMinutes, servings, title, slug,} = recipe;
  return (
    <li
      ref={ref}
      style={{ animationDelay: `${index * 0.03}s` }}
      className={`${activeView === "stack" ? "flex-col gap-4 sm:h-auto sm:flex-row sm:p-4 lg:gap-8" : "flex-col"} ${isVisible && isLoaded ? "animate-bounceUp" : ""} bg-neutral-0 shadow-m group flex space-y-4 rounded-xl p-2`}
    >
      <figure
        className={`${activeView === "stack" ? "sm:h-full sm:w-[200px] sm:shrink-0 lg:w-[250px]" : ""} relative overflow-hidden rounded-lg`}
      >
        <img
          src={large}
          alt=""
          onLoad={() => setIsLoaded(true)}
          className={`${activeView === "stack" ? "xxs:h-90 h-74 sm:h-full" : "xxs:h-50 h-40 sm:h-65 md:h-74 lg:h-60 xl:h-82"} w-full object-cover transition-transform duration-300 ease-in group-hover:scale-110`}
        />
        {activeView === "grid" && (
          <span className="absolute bottom-0 left-0 hidden rounded bg-black/80 px-2 py-1 text-sm text-white shadow-xl group-hover:block">
            {title}
          </span>
        )}
      </figure>
      <div className={`${activeView === "stack" ? "sm:flex-1" : "flex-1"} flex flex-col gap-4`}>
        <header>
          <h3
            className={`${activeView === "stack" ? "max-w-96 text-nowrap sm:max-w-full sm:text-wrap" : "max-w-96 text-nowrap lg:truncate"} text-5 no-scrollbar overflow-hidden overflow-x-auto font-bold`}
          >
            {title}
          </h3>

          <p
            className={`${activeView === "stack" ? "sm:text-wrap md:max-w-[40ch]" : "no-scrollbar max-h-10 overflow-x-auto text-ellipsis md:max-h-fit lg:max-h-[5ch]"} text-8`}
          >
            {overview}
          </p>
        </header>
        <ul
          className={`${activeView === "stack" ? "h-auto flex-wrap gap-4 lg:flex-col" : "no-scrollbar max-h-10 flex-col overflow-y-auto md:max-h-fit md:flex-row md:flex-wrap md:gap-2 lg:gap-4"} flex gap-0.5`}
        >
          <MetaData icon={servingIcon} data={servings} time={false}>
            Servings
          </MetaData>
          <MetaData icon={clockIcon} data={prepMinutes}>
            Prep
          </MetaData>
          <MetaData icon={cookIcon} data={cookMinutes}>
            Cook
          </MetaData>
        </ul>
        <ButtonCTA onClick={() => setCurrRecipe(id)} to={`/recipes/${slug}`} className="mt-auto w-full text-center">
          View Recipe
        </ButtonCTA>
      </div>
    </li>
  );
}
