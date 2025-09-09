import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/CTA";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import { RecipesProvider } from "./context/RecipesProvider";
import useRecipeContext from "./hooks/useRecipeContext";
import ScrollToTop from "./components/ScrollToTop";
export default function App() {
  const { currRecipe } = useRecipeContext();

  return (
    <div className="font-nunito min-h-dvh bg-neutral-100 text-neutral-900">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route index key="home" element={<HomePage />} />
          <Route path="about" key="about" element={<About />} />

          <Route path="recipes" key="recipes" element={<Recipes />}>
            <Route path=":slug" key={currRecipe} element={<RecipeDetails />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
