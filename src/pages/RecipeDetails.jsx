import { Link, useNavigate, useParams } from "react-router-dom";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useEffect, useRef, useState } from "react";
import { usePersistenIntersectionObserver } from "../hooks/usePersistenIntersectionObserver";
import { UseClickOutside } from "../hooks/UseClickOutside";

import MetaData from "../components/MetaData";
import Recipe from "../components/Recipe";
import RecipesList from "../components/RecipesList";

import CloseIcon from "../svg/CloseIcon";
import arrowIcon from "../assets/images/icon-bullet-point.svg";
import useRecipeContext from "../hooks/useRecipeContext";
import servingIcon from "../assets/images/icon-servings.svg";
import clockIcon from "../assets/images/icon-prep-time.svg";
import cookIcon from "../assets/images/icon-cook-time.svg";

export default function RecipeDetails() {
  const { slug } = useParams();

  const [isMounted, setIsMounted] = useState(false);
  const { recipes } = useRecipeContext();
  const recipe = recipes.find((rec) => rec.slug === slug);
  const moreRecipes = getRandomRecipes(
    recipes.filter((r) => r.slug !== slug),
    3,
  );

  useEffect(() => {
    setIsMounted(true);
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  //prettier-ignore
  const { image: { large },instructions, overview,prepMinutes,cookMinutes,servings,ingredients,title} = recipe;

  return (
    <div className="fixed inset-0 z-99 bg-black/40">
      <div
        className={`fixed left-0 h-[95%] w-full overflow-x-auto rounded-t-4xl bg-neutral-100 p-6 duration-300 lg:py-10 ${isMounted ? "bottom-0 opacity-100" : "-bottom-20 opacity-0"}`}
      >
        <RecipeHeader title={title} />
        <main className="xl-container sm:sm-container lg:md-container mt-10 grid grid-cols-1 justify-center gap-5 pb-8 lg:grid-cols-2 lg:gap-10 lg:pb-16">
          <figure className="mx-auto sm:max-w-[600px] lg:max-w-full">
            <img src={large} className="w-full rounded-xl" />
          </figure>
          <div className="lg:space-y-4">
            <div className="mt-5 space-y-2 lg:mt-0">
              <h1 className="text-2 font-extrabold">{title}</h1>
              <p className="text-6 font-medium text-neutral-800">{overview}</p>
            </div>

            <ul className="text-7 mt-5 flex flex-wrap gap-4 font-semibold lg:flex-col">
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

            <section>
              <h4 className="text-4 font-bold">Ingredients</h4>
              <List>
                {ingredients.map((ing, i) => (
                  <Item key={i} index={i}>
                    {ing}
                  </Item>
                ))}
              </List>
            </section>
            <section>
              <h4 className="text-4 font-bold">Instructions</h4>
              <List>
                {instructions.map((ins, i) => (
                  <Item key={i} index={i}>
                    {ins}
                  </Item>
                ))}
              </List>
            </section>
          </div>
        </main>

        <aside className="xl-container g border-t border-neutral-200 pt-8 lg:pt-16">
          <h3 className="text-3 font-bold">More recipes</h3>
          <RecipesList className="mt-6">
            {moreRecipes.map((rec, i) => (
              <Recipe key={rec.title} index={i} recipe={rec} />
            ))}
          </RecipesList>
        </aside>
      </div>
    </div>
  );
}

function RecipeHeader({ title }) {
  const [headerRef, isVisible] = usePersistenIntersectionObserver();
  return (
    <header ref={headerRef} className="text-7 xl-container flex items-center gap-2">
      <Link to="/recipes" className="cursor-pointer text-neutral-900/60 hover:underline">
        Recipes
      </Link>
      /
      <span className="xxs:w-fit xxs:overflow-visible max-w-[15ch] overflow-hidden text-nowrap text-ellipsis">
        {title}
      </span>
      <Link
        className={`${isVisible ? "ml-auto flex" : "fixed top-14 right-8 z-999 rounded-full bg-neutral-300 p-1 shadow-lg sm:top-16 sm:right-14 lg:top-20 lg:right-20 xl:right-26"} transition-[translate_scale] duration-300 hover:scale-115`}
        to="/recipes"
      >
        <CloseIcon className="size-8" />
      </Link>
    </header>
  );
}

function List({ children }) {
  return <ul className="mt-2 flex flex-col gap-2">{children}</ul>;
}

function Item({ children, index }) {
  const [refItem, isItemVisible] = useIntersectionObserver();

  return (
    <li
      style={{ animationDelay: `${index * 0.05}s` }}
      ref={refItem}
      className={`${isItemVisible ? "animate-bounceUp" : ""} flex gap-4`}
    >
      <img src={arrowIcon} className="mt-[1px] size-7 self-start" />

      <p className="text-6 font-medium">{children}</p>
    </li>
  );
}

function getRandomRecipes(arr, n) {
  const result = [];
  const used = new Set();
  while (result.length < n && result.length < arr.length) {
    const randomItemIndex = Math.floor(Math.random() * arr.length);
    if (used.has(randomItemIndex)) continue;
    used.add(randomItemIndex);
    result.push(arr[randomItemIndex]);
  }

  return result;
}
