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
    }

    filtered() {
        this.filteredRecipes = this.recipes;

        if (this.search !== '') {
            let filteredDataRecipe = [];
            for (let i = 0; i < this.filteredRecipes.length ; i++) {
                if (this.filteredRecipes[i].name.toLowerCase().includes(this.search.toLowerCase())) {
                    filteredDataRecipe.push(this.filteredRecipes[i]);
                }
            }
            this.filteredRecipes = filteredDataRecipe;
        }

        if (this.tags.ingredients !== undefined) {
            for (let i = 0; i < this.tags.ingredients.length; i++) {
                let filteredDataRecipe = [];
                for (let a = 0; a < this.filteredRecipes.length; a++) {
                    let ingredients = this.filteredRecipes[a].ingredients;
                    for (let b = 0; b < ingredients.length; b++) {
                        if (ingredients[b].ingredient === this.tags.ingredients[i]) {
                            filteredDataRecipe.push(this.filteredRecipes[a]);
                        }
                    }
                }
                this.filteredRecipes = filteredDataRecipe;
            }
        }

        if (this.tags.appliances !== undefined) {
            for (let i = 0; i < this.tags.appliances.length; i++) {
                let filteredRecipes = [];
                for (let a = 0; a < this.filteredRecipes.length; a++) {
                    if (this.filteredRecipes[a].appliance === this.tags.appliances[i]) {
                        filteredRecipes.push(this.filteredRecipes[a]);
                    }
                }
                this.filteredRecipes = filteredRecipes;
            }
        }

        if (this.tags.ustensils !== undefined) {
            for (let i = 0; i < this.tags.ustensils.length; i++) {
                let filteredRecipes = [];
                for (let a = 0; a < this.filteredRecipes.length; a++) {
                    let filteredRecipe = this.filteredRecipes[a].ustensils;
                    for (let b = 0; b < filteredRecipe.length; b++) {
                        if (filteredRecipe[b] === this.tags.ustensils[i]) {
                            filteredRecipes.push(this.filteredRecipes[a]);
                        }
                    }
                }
                this.filteredRecipes = filteredRecipes;
            }
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
