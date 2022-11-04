class ControllerRecipe {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.addSubscriber('update', (data) => {
            this.view.render(data)
        })
        this.view.addSubscriber('search', (data) => {
            this.model.setSearch(data);
        });
        this.view.addSubscriber('tag', (data) => {
            this.model.setTags(data);
        })
        this.view.recipesSearchListener();
        this.view.dropdownFunctionning();
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
}

export default ControllerRecipe;