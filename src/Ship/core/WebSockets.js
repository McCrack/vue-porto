export default class Socket
{
    static #instances = {};

    constructor(endpoint, subscribe)
    {
        if (Socket.#instances[endpoint]) {
            return Socket.#instances[endpoint];
        }

        Socket.#instances[endpoint] = this;

        this.endpoint = endpoint;
        this.subscribes = [subscribe];
        this.connection = new WebSocket(endpoint);
        this.connection.onopen = () => {
            this.connection.send(subscribe);
            this.connection.onmessage = this.onmessage;
        }
        this.connection.onclose = this.onclose;
        this.connection.onerror = this.onerror;
    }

    subscribe(subscribe)
    {
        this.subscribes.push(subscribe);
        this.send(JSON.stringify(this.subscribes));
    }
    unsubscribe(subscribe)
    {
        const inx = this.subscribes.indexOf(subscribe);
        this.subscribes.splice(inx, 1);
        this.send(JSON.stringify(this.subscribes));
    }

    send(message)
    {
        this.connection.send(message);
    }
    close(code = 1000, reason = null)
    {
        this.connection.close(code, reason)
    }
    onmessage(message)
    {
        for (const section in message.data) {
            if (section === 'Ship') {
                this.executeShipActions(message.data[section]);
            } else {
                this.executeContainersActions(section, message.data[section]);
            }
        }
    }

    executeContainersActions(section, containers)
    {
        for (const container in containers) {
            const actions = containers[container];
            for (const actionName in actions) {
                try {
                    const action = require(`@/Containers/${section}/${container}/actions/${actionName}.js`).default;
                    const data = actions[actionName];
                    action(data);
                } catch(error) {
                    this.onerror({
                        cose: 404,
                        message: error.message,
                    });
                }
            }
        }
    }
    executeShipActions(actions)
    {
        for (const actionName in actions) {
            try {
                const action = require(`@/Ship/actions/${actionName}.js`).default;
                const data = actions[actionName];
                action(data);
            } catch(error) {
                this.onerror({
                    code: 404,
                    message: error.message,
                });
            }
        }
    }

    onclose()
    {
        delete Socket.#instances[this.endpoint];
    }
    onerror(error)
    {
        switch (error.code) {
            default:
                console.log(error.message);
                break;
        }
    }

    get readyState()
    {
        // 0 – CONNECTING
        // 1 – OPEN
        // 2 – CLOSING
        // 3 – CLOSED
        return this.connection.readyState;
    }
}