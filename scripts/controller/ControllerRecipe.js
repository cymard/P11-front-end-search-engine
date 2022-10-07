import ModelRecipe from '../model/ModelRecipe.js';
import ViewRecipe from '../view/ViewRecipe.js';

class ControllerRecipe {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.addSubscriber('update', (data) => {
            view.render(data)
        })
        this.view.addSubscriber('search', (data) => {
            model.search(data);
        });
    }

    start() {
        let headers = {
            method: 'GET',
            headers: {"Content-Type": "text/plain;charset=UTF-8"},
            mode: 'cors',
            cache: 'default'
        }

        fetch('../data/recipes.json', headers)
            .then((res) => res.json())
            .then(({recipes}) => {
                this.model.setRecipes(recipes);
            })
    }

    // requestGet(uri, callback = (data) => this.createDataRecipes(data.recipes)) {
    //     let headers = {
    //         method: 'GET',
    //         headers: {"Content-Type": "text/plain;charset=UTF-8"},
    //         mode: 'cors',
    //         cache: 'default'
    //     }
    //
    //     fetch(uri, headers)
    //         .then((res) => res.json())
    //         .then(callback)
    // }
    //
    // createDataRecipes(recipes) {
    //     recipes.forEach(recipe => {
    //         this.model.addRecipe(recipe)
    //     });
    //     this.model.getRecipes()
    // }

    // addSubscriberToPublisher(publisher, subscriber) {
    //     publisher.addSubscriber(subscriber);
    // }
    //
}

// let app = new ControllerRecipe(new Model(), new View());
//
// app.requestGet('../data/recipes.json');
// app.addSubscriberToPublisher(app.model, app.view)

export default ControllerRecipe;