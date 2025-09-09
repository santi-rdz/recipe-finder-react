import { useEffect } from "react";

export function UseClickOutside(ref, onClickOutSide, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    function handleClickOutSide(e) {
      if (e.target.closest("[data-ignore-click-outside]")) return;

      if (ref.current && !ref.current.contains(e.target)) onClickOutSide();
    }
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, [ref, onClickOutSide, enabled]);
}
