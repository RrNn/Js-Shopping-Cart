import React, { Component } from "react";
import App from "./App";

class Test extends Component {
    constructor() {
        super();
        this.state = { data: [] };
    }
    render() {
        if (this.state.data == []) {
            return <div>No data</div>;
        } else {
            return <div>Some data</div>;
        }
    }
}
export default Test;
