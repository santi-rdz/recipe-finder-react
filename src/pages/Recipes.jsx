import { useRef, useState } from "react";
import { UseClickOutside } from "../hooks/UseClickOutside";
import { Outlet } from "react-router-dom";
import useRecipeContext from "../hooks/useRecipeContext";

import DropMenuBox from "../components/DropMenuBox";
import Recipe from "../components/Recipe";
import RecipesList from "../components/RecipesList";
import Main from "../components/Main";
import Footer from "../components/Footer";

import GridIcon from "../svg/GridIcon";
import StackIcon from "../svg/StackIcon";
import ChevronIcon from "../svg/ChevronIcon";
import searchIcon from "../assets/images/icon-search.svg";

const prepTimeOptions = [0, 5, 10];
const cookTimeOptions = [0, 5, 10, 15, 20];

export default function Recipes() {
  const { recipes, currRecipe } = useRecipeContext();
  const [activeTimeOp, setActiveTimeOp] = useState(null);
  const [activeCookOp, setActiveCookOp] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [input, setInput] = useState("");
  const [activeView, setActiView] = useState("grid");

  const recipesFiltered = recipes.filter((rec) => {
    const matchesInput =
      input === "" ||
      rec.title.toLowerCase().includes(input.toLowerCase()) ||
      rec.ingredients.some((i) => i.toLowerCase().includes(input.toLowerCase()));

    const matchesPrep = activeTimeOp === null || rec.prepMinutes <= activeTimeOp;

    const matchesCook = activeCookOp === null || rec.cookMinutes <= activeCookOp;

    return matchesInput && matchesPrep && matchesCook;
  });

  return (
    <>
      <Main className="md-container lg:pb-24">
        <Header />
        <RecipeNav className="mb-6 flex flex-col gap-4 md:flex-row">
          <FilterDrop
            id={0}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onSetActiveOp={setActiveTimeOp}
            activeOp={activeTimeOp}
            options={prepTimeOptions}
          >
            {activeTimeOp === null && "Max Prep Time"}
            {activeTimeOp !== null && activeTimeOp + " minutes"}
          </FilterDrop>
          <FilterDrop
            id={1}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onSetActiveOp={setActiveCookOp}
            activeOp={activeCookOp}
            options={cookTimeOptions}
          >
            {activeCookOp === null && "Max Cook Time"}
            {activeCookOp !== null && activeCookOp + " minutes"}
          </FilterDrop>

          <InputSearch
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search by name or ingredient..."
          />
        </RecipeNav>
        <div className="mb-2 flex justify-end">
          <div className="flex w-fit gap-1 rounded-lg bg-neutral-200 p-1">
            <ViewButton onClick={() => setActiView("stack")} activeView={activeView} value="stack">
              <StackIcon className="" />
            </ViewButton>
            <ViewButton onClick={() => setActiView("grid")} activeView={activeView} value="grid">
              <GridIcon className="" />
            </ViewButton>
          </div>
        </div>
        <RecipesList activeView={activeView}>
          {recipesFiltered.map((rec, i) => (
            <Recipe key={rec.title} index={i} activeView={activeView} recipe={rec} />
          ))}
        </RecipesList>

        <Outlet context={{ recipes }} key={currRecipe} />
      </Main>
      <div className="p-10 pb-6 md:py-10 lg:border-t lg:border-t-neutral-200 lg:py-12">
        <Footer className="md-container" />
      </div>
    </>
  );
}

function ViewButton({ children, value, activeView, ...rest }) {
  const isActive = value === activeView;
  return (
    <button
      {...rest}
      className={`${isActive ? "bg-gray-300" : "bg-neutral-200"} group text-gra9 hover: size-7 cursor-pointer rounded-md p-1 hover:bg-gray-300`}
    >
      {children}
    </button>
  );
}

function Header() {
  return (
    <header className="mb-[clamp(3rem,2.6479rem+1.5023vw,4rem)] flex flex-col space-y-3 lg:items-center lg:space-y-3 lg:text-center">
      <h1 className="text-1 font-bold">Explore our simple, healthy recipes</h1>
      <p className="text-6 font-medium text-neutral-800 lg:max-w-[60ch]">
        Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing. Use the search bar to
        find a recipe by name or ingredient, or simply scroll the list and let something delicious catch your eye.
      </p>
    </header>
  );
}
function RecipeNav({ children, className }) {
  return <div className={className}>{children}</div>;
}
function FilterDrop({ children, id, activeFilter, setActiveFilter, options, activeOp, onSetActiveOp }) {
  const isMenuActive = id === activeFilter;
  const dropRef = useRef(null);

  function handleShowMenu() {
    setActiveFilter(activeFilter === id ? null : id);
  }
  function handleFilterClick(value) {
    onSetActiveOp(value);
    setActiveFilter(null);
  }

  UseClickOutside(dropRef, () => setActiveFilter(null), isMenuActive);

  return (
    <div ref={dropRef} className="relative md:flex-[50%] lg:w-48 lg:flex-none">
      <button
        onClick={handleShowMenu}
        className="bg-neutral-0 text-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2.5 hover:ring-[1.5px] md:justify-between"
      >
        {children} <ChevronIcon />
      </button>
      <DropMenuBox className="absolute top-14 left-0 z-99 w-full gap-1 md:w-[125%]" showMenu={isMenuActive}>
        {options.map((op, i) => (
          <FilterOption
            key={i}
            isActive={activeOp === op}
            value={op}
            handleFilterClick={handleFilterClick}
            activeOp={activeOp}
          >
            <Radio isActive={activeOp === op} /> {op} minutes
          </FilterOption>
        ))}
        <FilterOption handleFilterClick={handleFilterClick} value={null}>
          Clear
        </FilterOption>
      </DropMenuBox>
    </div>
  );
}

function InputSearch({ ...props }) {
  return (
    <div className="lg relative md:flex-3/4 lg:ml-auto lg:w-78 lg:flex-none lg:grow-0">
      <input
        className="bg-neutral-0 text-7 w-full rounded-md py-2.5 pr-4 pl-11 text-ellipsis duration-300 hover:ring-[1.5px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current focus-visible:hover:ring-0"
        {...props}
        type="text"
      />
      <img src={searchIcon} className="absolute top-1/2 left-4 -translate-y-1/2" />
    </div>
  );
}

function FilterOption({ value, children, handleFilterClick, isActive }) {
  return (
    <button
      onClick={() => handleFilterClick(value)}
      className={`${isActive ? "pointer-events-none bg-neutral-100" : ""} flex cursor-pointer items-center gap-2 rounded-sm p-2 text-start transition-colors duration-200 hover:bg-neutral-200`}
    >
      {children}
    </button>
  );
}

function Radio({ isActive }) {
  return (
    <span
      className={`${isActive ? "size-1 ring-gray-950 after:absolute after:inset-0 after:m-auto after:size-2/3 after:rounded-full after:bg-gray-950 after:content-['']" : "ring-gray-300"} relative inline-block size-3 rounded-full ring-2`}
    ></span>
  );
}
