function createArticle (articleData) {
    const main = document.querySelector('main');
    let article = createElement('article', main);
    let figure = createElement('figure', article);
    let img = createElement('img', figure);
    let figcaption = createElement('figcaption', figure);
    let h4 = createElement('h4', figcaption);
    let span = createElement('span', figcaption);
    span.innerHTML = articleData.name;
    let clockIcon = createElement('i', span);
    clockIcon.classList.add('fa-regular','fa-clock');
    let timeSpan = createElement('span', span);
    timeSpan.innerHTML = articleData.time+' min';
    let ul = createElement('ul', figcaption);
    articleData.ingredients.forEach(ingredient => {
        let li = createElement('li', ul);

        if (ingredient.quantity === undefined) {
            li.innerText = ingredient.ingredient
            return;
        }

        if (ingredient.unit === undefined) {
            li.innerText = ingredient.ingredient + ': ' + ingredient.quantity
            return;
        }

        li.innerText = ingredient.ingredient + ': ' + ingredient.quantity + ' ' + ingredient.unit
    })

    let figcaptionParagraph = createElement('p', figcaption);
    figcaptionParagraph.innerText = articleData.description;
}

function createElement (tag, parentElement) {
    let newElement = document.createElement(tag);
    parentElement.append(newElement);
    return newElement;
}

let dataTest = {
    "id": 1,
    "name" : "Limonade de Coco",
    "servings" : 1,
    "ingredients": [
        {
            "ingredient" : "Lait de coco",
            "quantity" : 400,
            "unit" : "ml"
        },
        {
            "ingredient" : "Jus de citron",
            "quantity" : 2
        },
        {
            "ingredient" : "Crème de coco",
            "quantity" : 2,
            "unit" : "cuillères à soupe"
        },
        {
            "ingredient" : "Sucre",
            "quantity" : 30,
            "unit" : "grammes"
        },
        {
            "ingredient": "Glaçons"
        }
    ],
    "time": 10,
    "description": "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
    "appliance": "Blender",
    "ustensils": ["cuillère à Soupe", "verres", "presse citron" ]
}

createArticle(dataTest);
createArticle(dataTest);
createArticle(dataTest);
createArticle(dataTest);