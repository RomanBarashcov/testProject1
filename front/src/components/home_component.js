import React, {Component} from "react";

class HomeComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        let content = null;

        content = (
            <div><h2>Hello world</h2></div>
        );

        return content;
    }
}


export default HomeComponent;
