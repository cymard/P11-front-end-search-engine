import ModelRecipe from "./model/ModelRecipe.js";
import ViewRecipe from "./view/ViewRecipe.js";
import ControllerRecipe from "./controller/ControllerRecipe.js";

const init = () => {
    // model
    const modelRecipe = new ModelRecipe();
    // view
    const viewRecipe = new ViewRecipe();
    // controller
    let controllerRecipe = new ControllerRecipe(modelRecipe, viewRecipe);
    controllerRecipe.start();
    // controller.start
}

init();
