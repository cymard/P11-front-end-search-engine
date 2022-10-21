class Publisher {
    constructor() {
        this.subscribers = new Map();
    }

    addSubscriber(name, subscriber) {
        let subscribers = this.subscribers.get(name);
        if (!subscribers) {
            subscribers = [];
            this.subscribers.set(name, subscriber)
        }

        subscribers.push(subscriber);
    }

    removeSubscriber(name, subscriber) {
        let subscribers = this.subscribers.get(name);
        if (!subscribers) {
            return;
        }

        let index = subscribers.findIndex((element) => {
            element === subscriber
        });

        if (index !== -1) {
            subscribers.splice(index, 1);
        }
        /*
                const index = this.subscribers.indexOf(subscriber);
                if (index > -1) {
                    this.subscribers.splice(subscriber, 1);
                }
        */
    }

    notify(name, data) {
        let subscribers = this.subscribers.get(name);
        if (!subscribers) {
            return;
        }

        // subscribers.forEach((subscriber) => {
        //     subscriber(data);
        // })

        subscribers(data);
    }
}

export default Publisher;