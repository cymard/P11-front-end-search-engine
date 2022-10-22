import Publisher from "../model/Publisher.js";

class ViewRecipe extends Publisher {
    constructor() {
        super();
        this.tagIngredients = [];
        this.tagAppliances = [];
        this.tagUstensils = [];
    }

    __createElement(tag, parentElement) {
        let newElement = document.createElement(tag);
        parentElement.append(newElement);
        return newElement;
    }

    __notifyTags() {
        this.notify('tag', {
            ingredients: this.tagIngredients,
            ustensils: this.tagUstensils,
            appliances: this.tagAppliances
        })
    }

    render({recipes}) {
        this.clearView();
        let allIngredients = [];
        let allAppliances = [];
        let allUstensils = [];

        recipes.forEach(recipe => {
            this.__createOneRecipe(recipe, allIngredients, allAppliances, allUstensils)
        });

        this.__displayRowsRecipes(recipes)
    }

    clearView() {
        this.__removeAllChildNodes(document.getElementById('recipes'));
        // clear dropdowns data nodes
        this.__removeAllChildNodes(document.querySelector('label[for=search-ingredients] + ul'));
        this.__removeAllChildNodes(document.querySelector('label[for=search-appliances] + ul'));
        this.__removeAllChildNodes(document.querySelector('label[for=search-ustensils] + ul'));
    }

    __removeTagEvent(htmlNode, tagsArray, name) {
        htmlNode.addEventListener('click', () => {
            htmlNode.remove();
            const index = tagsArray.indexOf(name);
            if (index > -1) { // only splice array when item is found
                tagsArray.splice(index, 1); // 2nd parameter means remove one item only
            }
            this.__notifyTags();
        })
    }

    __createTag(name, selectName) {
        let isNecessaryToCreateTag = true;
        if (!['ingredient', 'appliance', 'ustensil'].includes(selectName)) {
            console.log('impossible de créer ce tag')
            return;
        }

        // Ne pas créer le tag si il existe déjà
        if(['ingredient', 'appliance', 'ustensil'].includes(selectName)) {
            this.tagIngredients.forEach((ingredient) => {
                if(ingredient === name) {
                    isNecessaryToCreateTag = false;
                }
            })

            this.tagAppliances.forEach((appliance) => {
                if(appliance === name) {
                    isNecessaryToCreateTag = false;
                }
            })

            this.tagUstensils.forEach((ustensil) => {
                if(ustensil === name) {
                    isNecessaryToCreateTag = false;
                }
            })
        }

        if(isNecessaryToCreateTag) {
            let tagsContainer = document.getElementById('tags');
            let tagButton = this.__createElement('button', tagsContainer);
            tagButton.classList.add(selectName + 'BackgroundColor')

            if(selectName === 'ingredient') {
                this.tagIngredients.push(name);
                this.__removeTagEvent(tagButton, this.tagIngredients, name);
            }
            if(selectName === 'appliance') {
                this.tagAppliances.push(name);
                this.__removeTagEvent(tagButton, this.tagAppliances, name);
            }
            if(selectName === 'ustensil') {
                this.tagUstensils.push(name);
                this.__removeTagEvent(tagButton, this.tagUstensils, name);
            }

            let tagSpan = this.__createElement('span', tagButton);
            tagSpan.innerText = name;
            let xmarkIcone = this.__createElement('i', tagButton);
            xmarkIcone.classList.add('fa-regular');
            xmarkIcone.classList.add('fa-circle-xmark');

            this.__notifyTags();
        }
    }

    __removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    __createOneRecipe(recipe, allIngredients, allAppliances, allUstensils) {

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
            // Afficher dans le dropdown
            if (!allIngredients.includes(ingredient.ingredient.toLowerCase())) {
                allIngredients.push(ingredient.ingredient.toLowerCase());
                let ulIngredient = document.querySelector('label[for=search-ingredients] + ul')
                let liIngredient = this.__createElement('li', ulIngredient);
                let linkIngredient = this.__createElement('a', liIngredient);
                linkIngredient.setAttribute('href', '#');
                linkIngredient.innerText = ingredient.ingredient;
                linkIngredient.addEventListener('click', () => {
                    this.__createTag(ingredient.ingredient, 'ingredient');
                })
            }

            // Affichage recette cards
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
        })

        if (!allAppliances.includes(recipe.appliance)) {
            allAppliances.push(recipe.appliance);
            let ulAppliance = document.querySelector('label[for=search-appliances] + ul')
            let liAppliance = this.__createElement('li', ulAppliance);
            let linkAppliance = this.__createElement('a', liAppliance);
            linkAppliance.setAttribute('href', '#');
            linkAppliance.innerText = recipe.appliance;
            linkAppliance.addEventListener('click', () => {
                this.__createTag(recipe.appliance, 'appliance')
            })
        }

        recipe.ustensils.forEach(ustensil => {
            if (!allUstensils.includes(ustensil)) {
                allUstensils.push(ustensil);
                let ulUstensil = document.querySelector('label[for=search-ustensils] + ul');
                let liUstensil = this.__createElement('li', ulUstensil);
                let linkUstensil = this.__createElement('a', liUstensil);
                linkUstensil.setAttribute('href', '#');
                linkUstensil.innerText = ustensil;
                linkUstensil.addEventListener('click', () => {
                    this.__createTag(ustensil, 'ustensil')
                })
            }
        })
    }

    __displayRowsRecipes(recipesData) {
        // définir le nombre de rows
        const divRecipes = document.querySelector('#recipes');
        divRecipes.style.gridTemplateRows = 'repeat(' + Math.ceil(recipesData.length / 3) + ',364px)'
    }

    recipesSearchListener() {
        document.getElementById('recipes-search').addEventListener('change', (e) => {
            this.notify('search', e.target.value)
        })
    }

    dropdownFunctionning() {
        let inputsSearch = document.querySelectorAll('fieldset div input');

        let displayDropdownData = (element) => {
            element.classList.add('placeholderOpacityOn');

            let label = element.parentElement;
            let dataContentUl = label.nextElementSibling;
            dataContentUl.style.display = 'grid';

            label.style.borderEndStartRadius = 0;
            label.style.borderEndEndRadius = 0;

            let arrow = element.nextElementSibling;
            arrow.classList.replace('fa-chevron-down', 'fa-chevron-up');
        }

        let hideDropdownData = (element) => {
            element.classList.remove('placeholderOpacityOn');

            let label = element.parentElement;
            let dataContentUl = label.nextElementSibling;
            dataContentUl.style.display = 'none';

            label.style.borderEndStartRadius = '5px';
            label.style.borderEndEndRadius = '5px';

            let arrow = element.nextElementSibling;
            arrow.classList.replace('fa-chevron-up', 'fa-chevron-down');
        };

        inputsSearch.forEach(element => {

            element.addEventListener('focusin', (e) => {
                if (element.id === 'search-ingredients') {
                    element.placeholder = 'Rechercher un ingrédient';
                    displayDropdownData(element);
                }

                if (element.id === 'search-appliances') {
                    element.placeholder = 'Rechercher un appareil'
                    displayDropdownData(element);
                }

                if (element.id === 'search-ustensils') {
                    element.placeholder = 'Rechercher un ustensile'
                    displayDropdownData(element);
                }
            })

            document.body.addEventListener('click', (e) => {
                if (document.hasFocus()) {
                    if (e.target.closest('#' + element.id)) {
                        return;
                    }

                    if (e.target.closest('label[for=' + element.id + '] + ul')) {
                        return;
                    }

                    if (element.id === 'search-ingredients') {
                        element.placeholder = 'Ingredients'
                        hideDropdownData(element);
                    }

                    if (element.id === 'search-appliances') {
                        element.placeholder = 'Appareils';
                        hideDropdownData(element);
                    }

                    if (element.id === 'search-ustensils') {
                        element.placeholder = 'Ustensiles';
                        hideDropdownData(element);
                    }
                }
            })

            // element.addEventListener('focusout', (e) => {
            //     if(element.id === 'search-ingredients') {
            //         element.placeholder = 'Ingredients'
            //         hideDropdownData(element);
            //     }
            //
            //     if(element.id === 'search-appliances') {
            //         element.placeholder = 'Appareils';
            //         hideDropdownData(element);
            //     }
            //
            //     if(element.id === 'search-ustensils') {
            //         element.placeholder = 'Ustensiles';
            //         hideDropdownData(element);
            //     }
            // })

        });
    }
}

export default ViewRecipe;
