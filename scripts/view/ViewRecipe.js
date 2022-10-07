import Subscriber from "./Subscriber.js";
import Publisher from "../model/Publisher.js";

class ViewRecipe extends Publisher {
    __createElement(tag, parentElement) {
        let newElement = document.createElement(tag);
        parentElement.append(newElement);
        return newElement;
    }

    render({recipes}) {
        console.log(recipes)

        recipes.forEach(recipe => {
            this.__createOneRecipe(recipe)
        });

        this.__displayRowsRecipes(recipes)


    }

    __createOneRecipe(recipe) {
        let allIngredients = [];
        let allAppliances = [];
        let allUstensils = [];

        const divRecipes = document.querySelector('#recipes');
        let article = this.__createElement('article', divRecipes);
        let figure = this.__createElement('figure', article);
        let img = this.__createElement('img', figure);
        let figcaption = this.__createElement('figcaption', figure);
        let firstDiv = this.__createElement('div', figcaption);
        let secondDiv = this.__createElement('div', figcaption);
        let h4 = this.__createElement('h4', firstDiv);
        h4.innerText = recipe.name
        let span = this.__createElement('span', firstDiv);
        let clockIcon = this.__createElement('i', span);
        clockIcon.classList.add('fa-regular', 'fa-clock');
        let timeSpan = this.__createElement('span', span);
        timeSpan.innerHTML = recipe.time + ' min';
        let ulDropdown = this.__createElement('ul', secondDiv);
        let figcaptionParagraph = this.__createElement('p', secondDiv);
        figcaptionParagraph.innerText = recipe.description;

        recipe.ingredients.forEach(ingredient => {
            // afficher dans les cards
            let liDropdown = this.__createElement('li', ulDropdown);
            let linkDropdown = this.__createElement('a', liDropdown);
            let spanFontIngredient = this.__createElement('span', linkDropdown);

            if (ingredient.quantity === undefined) {
                spanFontIngredient.innerText = ingredient.ingredient;
                return;
            }

            let spanFontQuantityUnits = this.__createElement('span', linkDropdown);
            spanFontQuantityUnits.classList.add('fontQuantityUnits');

            if (ingredient.unit === undefined) {
                spanFontIngredient.innerText = ingredient.ingredient + ': ';
                spanFontQuantityUnits.innerText = ingredient.quantity;
                return;
            }

            spanFontIngredient.innerText = ingredient.ingredient + ': ';
            spanFontQuantityUnits.innerText = ingredient.quantity + ' ' + ingredient.unit;

            // afficher dans le dropdown
            // ingrédients
            if (!allIngredients.includes(ingredient.ingredient)) {
                allIngredients.push(ingredient.ingredient);
                let ulIngredient = document.querySelector('label[for=search-ingredients] + ul')
                let liIngredient = this.__createElement('li', ulIngredient);
                let linkIngredient = this.__createElement('a', liIngredient);
                linkIngredient.setAttribute('href', '#' + ingredient.ingredient);
                linkIngredient.innerText = ingredient.ingredient;
            }
        })

        if (!allAppliances.includes(recipe.appliance)) {
            allAppliances.push(recipe.appliance);
            let ulAppliance = document.querySelector('label[for=search-appliances] + ul')
            let liAppliance = this.__createElement('li', ulAppliance);
            let linkAppliance = this.__createElement('a', liAppliance);
            linkAppliance.setAttribute('href', '#' + recipe.appliance);
            linkAppliance.innerText = recipe.appliance;
        }

        recipe.ustensils.forEach(ustensil => {
            if (!allUstensils.includes(ustensil)) {
                allUstensils.push(ustensil);
                let ulUstensil = document.querySelector('label[for=search-ustensils] + ul');
                let liUstensil = this.__createElement('li', ulUstensil);
                let linkUstensil = this.__createElement('a', liUstensil);
                linkUstensil.setAttribute('href', '#' + ustensil);
                linkUstensil.innerText = ustensil;
            }
        })
    }

    __displayRowsRecipes(recipesData) {
        // définir le nombre de rows
        const divRecipes = document.querySelector('#recipes');
        divRecipes.style.gridTemplateRows = 'repeat(' + Math.ceil(recipesData.length / 3) + ',364px)'
    }
}

export default ViewRecipe;
