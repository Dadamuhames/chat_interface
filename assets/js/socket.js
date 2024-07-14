let stompClient;

const stompConfig = {
    // Typically, login, passcode and vhost
    // Adjust these for your broker
    connectHeaders: {
        "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`
    },

    // Broker URL, should start with ws:// or wss:// - adjust for your broker setup
    brokerURL: "ws://localhost:8080/ws",

    // Keep it off for production, it can be quit verbose
    // Skip this key to disable
    debug: function (str) {
        console.log('STOMP: ' + str);
    },

    // If disconnected, it will retry after 200ms
    // reconnectDelay: 20000000000,

    // Subscriptions should be done inside onConnect as those need to reinstated when the broker reconnects
    onConnect: function (frame) {
        // The return object has a method called `unsubscribe`
        stompClient.subscribe(`/user/messages`, (message) => {
            onMessage(JSON.parse(message.body));
            console.log(message.body);
        }, this.connectHeaders);

        stompClient.subscribe('/user/messages/read', (message) => {
            console.log(message.body);
            onMessageRead(JSON.parse(message.body))
        }, this.connectHeaders);

        stompClient.subscribe('/user/groups/created', (message) => {
            onChatCreated(JSON.parse(message.body))
        }, this.connectHeaders);
    }
};

// Create an instance
stompClient = new StompJs.Client(stompConfig);


stompClient.activate();
