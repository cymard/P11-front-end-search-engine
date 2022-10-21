import ModelRecipe from "./model/ModelRecipe.js";
import ViewRecipe from "./view/ViewRecipe.js";
import ControllerRecipe from "./controller/ControllerRecipe.js";

const init = () => {
    let controllerRecipe = new ControllerRecipe(new ModelRecipe(), new ViewRecipe());
    controllerRecipe.start();
}

init();
