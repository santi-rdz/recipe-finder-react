import { NavLink } from "react-router-dom";

export default function ButtonCTA({ className, children, to, onClick, style, state }) {
  return (
    <NavLink
      data-ignore-click-outside
      state={state}
      style={style}
      onClick={onClick}
      to={to}
      className={`rounded-lg bg-neutral-900 px-4 py-3 font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </NavLink>
  );
}
