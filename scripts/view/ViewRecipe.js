import Publisher from "../model/Publisher.js";

class ViewRecipe extends Publisher {
    constructor() {
        super();
        this.tagIngredients = [];
        this.tagAppliances = [];
        this.tagUstensils = [];
        this.allIngredients = [];
        this.allAppliances = [];
        this.allUstensils = [];
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

    displayRecipeIngredientsInDropdown(ingredientSearch) {

        let ulIngredient = document.querySelector('label[for=search-ingredients] + ul');
        this.__removeAllChildNodes(ulIngredient)

        let searchedIngredients = [];
        this.allIngredients.forEach((element) => {
            // trier les ingrédients à afficher dans le dropdown
            if(element.startsWith(ingredientSearch.value)) {
                searchedIngredients.push(element)
            }
        })

        if(searchedIngredients.length === 0) {
            let para = this.__createElement('p', ulIngredient);
            para.style.color = '#FFF'
            para.innerText = 'aucun résultat'
        }

        searchedIngredients.forEach((ingredient) => {
            let liIngredient = this.__createElement('li', ulIngredient);
            let linkIngredient = this.__createElement('a', liIngredient);
            linkIngredient.setAttribute('href', '#');
            linkIngredient.innerText = ingredient;
            linkIngredient.addEventListener('click', () => {
                this.__createTag(ingredient, 'ingredient');
                ingredientSearch.value = '';
            })
        })
    }

    displayRecipeAppliancesInDropdown(applianceSearch) {

        let ulAppliance = document.querySelector('label[for=search-appliances] + ul');
        this.__removeAllChildNodes(ulAppliance)

        let searchedAppliances = [];
        this.allAppliances.forEach((element) => {
            // trier les appareils à afficher dans le dropdown
            if(element.startsWith(applianceSearch.value)) {
                searchedAppliances.push(element)
            }
        })

        if(searchedAppliances.length === 0) {
            let para = this.__createElement('p', ulAppliance);
            para.style.color = '#FFF'
            para.innerText = 'aucun résultat'
        }

        searchedAppliances.forEach((appliance) => {
            let liAppliance = this.__createElement('li', ulAppliance);
            let linkAppliance = this.__createElement('a', liAppliance);
            linkAppliance.setAttribute('href', '#');
            linkAppliance.innerText = appliance;
            linkAppliance.addEventListener('click', () => {
                this.__createTag(appliance, 'appliance')
                applianceSearch.value = '';
            })
        })

    }

    displayRecipeUstensilsInDropdown(ustensilSearch) {

        let ulUstensil = document.querySelector('label[for=search-ustensils] + ul');
        this.__removeAllChildNodes(ulUstensil)

        let searchedUstensils = [];
        this.allUstensils.forEach((element) => {
            // trier les ustensiles à afficher dans le dropdown
            if(element.startsWith(ustensilSearch.value)) {
                searchedUstensils.push(element)
            }
        })

        if(searchedUstensils.length === 0) {
            let para = this.__createElement('p', ulUstensil);
            para.style.color = '#FFF'
            para.innerText = 'aucun résultat'
        }

        searchedUstensils.forEach((ustensil) => {
            let ulUstensil = document.querySelector('label[for=search-ustensils] + ul');
            let liUstensil = this.__createElement('li', ulUstensil);
            let linkUstensil = this.__createElement('a', liUstensil);
            linkUstensil.setAttribute('href', '#');
            linkUstensil.innerText = ustensil;
            linkUstensil.addEventListener('click', () => {
                this.__createTag(ustensil, 'ustensil')
                ustensilSearch.value = '';
            })
        })

    }

    render({recipes}) {
        this.clearView();
        this.allIngredients = [];
        this.allAppliances = [];
        this.allUstensils = [];

        if(recipes.length === 0) {
            let recipesContainer = document.getElementById('recipes');
            let para = this.__createElement('p', recipesContainer);
            para.innerText = 'Aucune recette trouvée pour cette recherche.'
        }

        // init dropdown search
        let ingredientSearch = document.getElementById('search-ingredients');
        ingredientSearch.addEventListener('input', () => {
            this.displayRecipeIngredientsInDropdown(ingredientSearch)
        })

        // init appliance search
        let applianceSearch = document.getElementById('search-appliances');
        applianceSearch.addEventListener('input', () => {
            this.displayRecipeAppliancesInDropdown(applianceSearch)
        })

        // init ustensil search
        let ustensilSearch = document.getElementById('search-ustensils');
        ustensilSearch.addEventListener('input', () => {
            this.displayRecipeUstensilsInDropdown(ustensilSearch)
        })

        recipes.forEach(recipe => {
            this.__createOneRecipe(recipe)
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
            if (index > -1) {
                tagsArray.splice(index, 1);
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

    __createOneRecipe(recipe) {

        const divRecipes = document.querySelector('#recipes');
        let article = this.__createElement('article', divRecipes);
        let figure = this.__createElement('figure', article);
        this.__createElement('img', figure);
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
        if(recipe.description.length > 200) {
            figcaptionParagraph.innerText = recipe.description.substring(1, 200) + '...';
        } else {
            figcaptionParagraph.innerText = recipe.description
        }

        recipe.ingredients.forEach(ingredient => {
            // Afficher ingrédient dans le dropdown
            if (!this.allIngredients.includes(ingredient.ingredient)) {
                this.allIngredients.push(ingredient.ingredient);
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

        if (!this.allAppliances.includes(recipe.appliance)) {
            this.allAppliances.push(recipe.appliance);
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
            if (!this.allUstensils.includes(ustensil)) {
                this.allUstensils.push(ustensil);
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
        const divRecipes = document.querySelector('#recipes');
        divRecipes.style.gridTemplateRows = 'repeat(' + Math.ceil(recipesData.length / 3) + ',364px)'
    }

    recipesSearchListener() {
        document.getElementById('recipes-search').addEventListener('input', (e) => {
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
        });
    }
}

export default ViewRecipe;
