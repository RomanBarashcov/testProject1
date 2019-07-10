import React, {Component} from "react";

class NotificationItemComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        let content = null;

        content = (
            <tr>
                <td><div>{this.props.id}</div></td>
                <td><div>{this.props.type}</div></td>
                <td><div>{this.props.message}</div></td>
                <td><div>{this.props.date}</div></td>
                <td><div>{this.props.user}</div></td>
            </tr>
        );
        return content;
    }
}


export default NotificationItemComponent;
