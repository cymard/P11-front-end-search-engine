import Publisher from "./Publisher.js";

class ModelRecipe extends Publisher {
    constructor() {
        super();
        this.recipes = [];
        this.filteredRecipes = [];
        this.search = '';
    }

    getRecipes() {
        console.log(this.recipes)
        return this.recipes;
    }

    setRecipes(recipesData) {
        this.recipes = recipesData;
        this.filtered();
        /*
        recipesData.forEach((recipe) => {
            this.__setOneRecipe(recipe);
        })
        */
    }

    search(search) {
        this.search = search;
        this.filtered();
    }

    filtered() {
        this.filteredRecipes = this.recipes;
        if (this.search !== '') {
            // on filter
            // on créé tableau
            // on enregistre ce tableau dans filteredrecipe
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
