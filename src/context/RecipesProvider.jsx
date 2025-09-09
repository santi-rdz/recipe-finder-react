import { useState, useEffect } from "react";
import { RecipesContext } from "../hooks/useRecipeContext";

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [currRecipe, setCurrRecipe] = useState(null);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return <RecipesContext.Provider value={{ recipes, setCurrRecipe, currRecipe }}>{children}</RecipesContext.Provider>;
}
