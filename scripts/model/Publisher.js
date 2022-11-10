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

    notify(name, data) {
        let subscribers = this.subscribers.get(name);

        if (!subscribers) {
            return;
        }

        subscribers(data);
    }
}

export default Publisher;