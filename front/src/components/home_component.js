import React, {Component} from "react";

class HomeComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        let content = null;
        console.log("HOME_COMPONENT");
        content = (
            <div><h2>Hellow world</h2></div>
        );

        return content;
    }
}


export default HomeComponent;
