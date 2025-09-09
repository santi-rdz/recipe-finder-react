export default function DropMenuBox({ className, children, showMenu, ...rest }) {
  return (
    <menu
      {...rest}
      className={`${showMenu ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"} flex flex-col rounded-lg bg-white p-2 shadow-lg transition-[opacity_transform] duration-300 ${className}`}
    >
      {children}
    </menu>
  );
}
