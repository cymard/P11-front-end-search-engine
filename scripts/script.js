let headers = {method: 'GET', headers: {"Content-Type": "text/plain;charset=UTF-8"}, mode: 'cors', cache: 'default'}
fetch('./scripts/recipes.json', headers)
    .then((res) => res.json())
    .then(function (data) {
        console.log(data.recipes)
        createDataRecipes(data.recipes)
    })

function createDataRecipes(recipes) {
    recipes.forEach(recipe => {
        createArticle(recipe)
    });

    // définir le nombre de rows
    const divRecipes = document.querySelector('#recipes');
    divRecipes.style.gridTemplateRows = 'repeat(' + Math.ceil(recipes.length / 3) + ',364px)'
}

let allIngredients = [];
let allAppliances = [];
let allUstensils = [];

function createArticle(articleData) {
    const divRecipes = document.querySelector('#recipes');
    let article = createElement('article', divRecipes);
    let figure = createElement('figure', article);
    let img = createElement('img', figure);
    let figcaption = createElement('figcaption', figure);
    let firstDiv = createElement('div', figcaption);
    let secondDiv = createElement('div', figcaption);
    let h4 = createElement('h4', firstDiv);
    h4.innerText = articleData.name
    let span = createElement('span', firstDiv);
    let clockIcon = createElement('i', span);
    clockIcon.classList.add('fa-regular', 'fa-clock');
    let timeSpan = createElement('span', span);
    timeSpan.innerHTML = articleData.time + ' min';
    let ulDropdown = createElement('ul', secondDiv);
    let figcaptionParagraph = createElement('p', secondDiv);
    figcaptionParagraph.innerText = articleData.description;

    // Data dans les dropdowns

    articleData.ingredients.forEach(ingredient => {
        // afficher dans les cards
        let liDropdown = createElement('li', ulDropdown);
        let linkDropdown = createElement('a', liDropdown);
        let spanFontIngredient = createElement('span', linkDropdown);

        if (ingredient.quantity === undefined) {
            spanFontIngredient.innerText = ingredient.ingredient;
            return;
        }

        let spanFontQuantityUnits = createElement('span', linkDropdown);
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
            let liIngredient = createElement('li', ulIngredient);
            let linkIngredient = createElement('a', liIngredient);
            linkIngredient.setAttribute('href', '#' + ingredient.ingredient);
            linkIngredient.innerText = ingredient.ingredient;
        }
    })

    if (!allAppliances.includes(articleData.appliance)) {
        allAppliances.push(articleData.appliance);
        let ulAppliance = document.querySelector('label[for=search-appliances] + ul')
        let liAppliance = createElement('li', ulAppliance);
        let linkAppliance = createElement('a', liAppliance);
        linkAppliance.setAttribute('href', '#' + articleData.appliance);
        linkAppliance.innerText = articleData.appliance;
    }

    articleData.ustensils.forEach(ustensil => {
        if (!allUstensils.includes(ustensil)) {
            allUstensils.push(ustensil);
            let ulUstensil = document.querySelector('label[for=search-ustensils] + ul');
            let liUstensil = createElement('li', ulUstensil);
            let linkUstensil = createElement('a', liUstensil);
            linkUstensil.setAttribute('href', '#' + ustensil);
            linkUstensil.innerText = ustensil;
        }
    })
}

function createElement(tag, parentElement) {
    let newElement = document.createElement(tag);
    parentElement.append(newElement);
    return newElement;
}

// modification du dropdown
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
}

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
