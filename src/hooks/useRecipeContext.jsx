import { createContext, useContext } from "react";

export const RecipesContext = createContext();

export default function useRecipeContext() {
  return useContext(RecipesContext);
}
