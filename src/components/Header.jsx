import Logo from "../assets/images/logo.svg";
import BurgerMenuIcon from "../assets/images/icon-hamburger-menu.svg";
import { Link, NavLink } from "react-router-dom";
import DropMenuBox from "./DropMenuBox";
import ButtonCTA from "./ButtonCTA";
import { useRef, useState } from "react";
import { UseClickOutside } from "../hooks/UseClickOutside";
import BorderWrapper from "./BorderWrapper";
const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Recipes",
    path: "/recipes",
  },
];

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const dropRef = useRef(null);
  UseClickOutside(dropRef, () => setShowMenu(false), showMenu);
  return (
    <BorderWrapper>
      <header className="xl-container py-5">
        <nav ref={dropRef} className="relative grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr]">
          <Link to="/">
            <img src={Logo} className="w-fit" alt="" />
          </Link>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="cursor-pointer rounded-sm bg-neutral-300 p-3 lg:hidden"
          >
            <img src={BurgerMenuIcon} alt="" />
          </button>

          <DropMenuBox
            showMenu={showMenu}
            className="absolute top-12 z-99 flex w-full flex-col gap-1 lg:pointer-events-auto lg:static lg:w-fit lg:scale-100 lg:flex-row lg:items-center lg:gap-6 lg:bg-transparent lg:opacity-100 lg:shadow-none"
          >
            {links.map(({ name, path }) => (
              <MenuLink key={path} setShowMenu={setShowMenu} to={path}>
                {name}
              </MenuLink>
            ))}

            <ButtonCTA onClick={() => setShowMenu(false)} to="/recipes" className="text-center lg:hidden">
              Browse Recipes
            </ButtonCTA>
          </DropMenuBox>

          <ButtonCTA to="/recipes" className="hidden h-full w-fit place-self-end lg:flex lg:items-center">
            Browse Recipes
          </ButtonCTA>
        </nav>
      </header>
    </BorderWrapper>
  );
}

function MenuLink({ children, to, setShowMenu }) {
  return (
    <NavLink
      onClick={() => setShowMenu(false)}
      to={to}
      className={`text-7 nav-item lg:active relative rounded-sm p-2 font-semibold duration-300 ease-in-out hover:bg-neutral-300 active:pointer-events-none active:bg-neutral-200 lg:p-1 lg:hover:scale-110 lg:active:bg-transparent`}
    >
      {children}
    </NavLink>
  );
}
