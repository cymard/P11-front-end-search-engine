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
        this.subscribers.forEach((subscriber) => {
            subscriber(data);
        })
        /*
                if (this.subscribers.length > 0) {
                    this.subscribers.forEach((subscriber) => subscriber.update(data))
                }
                */

    }
    // addSubscriber(name, subscriber) {
    //     let subscribers = this.subscribers.get(name);
    //     if (!subscribers) {
    //         subscribers = [];
    //         this.subscribers.set(name, subscriber)
    //     }
    //
    //     subscribers.push(subscriber);
    //     console.log(this.subscribers)
    // }

    /*
        getSubscribers() {
            this.subscribers.forEach((value, key) => {
                console.log('key: '+key+', value: '+value);
            })
        }

        getSubscriber(name) {
            this.subscribers.get(name);
        }

        addSubscriber(name, subscriber) {
            if(!this.subscribers.has(name)) {
                this.subscribers.set(name, subscriber);
            }
        }

        removeSubscriber(name) {
            if(this.subscribers.has(name)) {
                this.subscribers.remove(name);
            }
        }

        notify(data) {
            this.subscribers.forEach((value) => {
                value.update(data);
            })
        }
    */

}

export default Publisher;