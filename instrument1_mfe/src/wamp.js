import React from "react";
import autobahn from 'autobahn-browser';

const config = require("../configfile.json").connection;

class Connection extends React.Component {
    constructor() {
        super()
        this.connection = new autobahn.Connection({
            url: config.router.url,
            realm: config.router.realm
        })
    }

    subscribe(topic, subscribeCallback) {
        this.connection.onopen = (session, details) => {
            session.subscribe(topic, subscribeCallback)
        }
        this.connection.open();
    }

    componentWillUnmount() {
        this.autobahnConnection.close();
    }
}

export default Connection