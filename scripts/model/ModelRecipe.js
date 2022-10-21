import Publisher from "./Publisher.js";

class ModelRecipe extends Publisher {
    constructor() {
        super();
        this.recipes = [];
        this.filteredRecipes = [];
        this.search = '';
        this.ingredients = [];
        this.appliances = [];
        this.ustensils = [];

    }

    getRecipes() {
        return this.recipes;
    }

    setRecipes(recipesData) {
        this.recipes = recipesData;
        this.filtered();
    }

    setSearch(search) {
        this.search = search;
        this.filtered();
    }

    filtered() {
        this.filteredRecipes = this.recipes;
        if (this.search !== '') {
            let filteredDataRecipe = [];
            this.recipes.forEach((recipe) => {
                if(recipe.name.toLowerCase().startsWith(this.search.toLowerCase())) {
                    filteredDataRecipe.push(recipe);
                }
            })
            this.filteredRecipes = filteredDataRecipe;
        }
        this.updatedChange();
    }


    updatedChange() {
        this.notify('update', {
            recipes: this.filteredRecipes
        });
    }
/*
    __setOneRecipe(recipeData) {
        this.recipes.push(recipeData)
    }
*/
    //
    // removeRecipe(recipeId) {
    //     this.recipes.forEach((recipe, index) => {
    //         if(recipe.id === recipeId) {
    //             this.recipes.splice(index, 1);
    //         }
    //     })
    // }
}

export default ModelRecipe;
