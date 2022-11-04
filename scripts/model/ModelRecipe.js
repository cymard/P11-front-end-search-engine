import Publisher from "./Publisher.js";

class ModelRecipe extends Publisher {
    constructor() {
        super();
        this.recipes = [];
        this.filteredRecipes = [];
        this.search = '';
        this.tags = '';
    }

    setRecipes(recipesData) {
        this.recipes = recipesData;
        this.filtered();
    }

    setSearch(search) {
        this.search = search;
        this.filtered();
    }

    setTags(tags) {
        this.tags = tags;
        this.filtered();
        console.log(this.tags);
    }

    filtered() {
        this.filteredRecipes = this.recipes;

        if (this.search !== '') {
            let filteredDataRecipe = [];
            this.filteredRecipes.forEach((recipe) => {
                if (recipe.name.toLowerCase().startsWith(this.search.toLowerCase())) {
                    filteredDataRecipe.push(recipe);
                }
            })
            this.filteredRecipes = filteredDataRecipe;
        }

        if (this.tags.ingredients !== undefined) {
            this.tags.ingredients.forEach((tagIngredient) => {
                let filteredDataRecipe = [];
                this.filteredRecipes.forEach((recipe) => {
                    recipe.ingredients.forEach((ingredient) => {
                        if (ingredient.ingredient === tagIngredient) {
                            filteredDataRecipe.push(recipe)
                        }
                    })
                })
                this.filteredRecipes = filteredDataRecipe;
            })
        }

        if (this.tags.appliances !== undefined) {
            this.tags.appliances.forEach((tagAppliance) => {
                let filteredRecipes = [];
                this.filteredRecipes.forEach((filteredRecipe) => {
                    if (filteredRecipe.appliance === tagAppliance) {
                        filteredRecipes.push(filteredRecipe);
                    }
                })
                this.filteredRecipes = filteredRecipes;
            })
        }

        if (this.tags.ustensils !== undefined) {
            this.tags.ustensils.forEach((tagUstensil) => {
                let filteredRecipes = [];
                this.filteredRecipes.forEach((filteredRecipe) => {
                    filteredRecipe.ustensils.forEach((ustensil) => {
                        if (ustensil === tagUstensil) {
                            filteredRecipes.push(filteredRecipe);
                        }
                    })
                })
                this.filteredRecipes = filteredRecipes;
            })
        }

        this.updatedChange();
    }

    updatedChange() {
        this.notify('update', {
            recipes: this.filteredRecipes
        });
    }
}

export default ModelRecipe;
