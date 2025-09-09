export default function RecipesList({ children, activeView = "grid", className }) {
  return (
    <ul
      className={`${activeView === "stack" ? "grid-cols-1 gap-8" : "grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 lg:gap-8"} ${className} grid`}
    >
      {children}
    </ul>
  );
}
