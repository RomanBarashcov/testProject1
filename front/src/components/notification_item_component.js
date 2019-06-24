import React, {Component} from "react";
import { Link } from "react-router-dom";

class NotificationItemComponent extends Component {

    constructor(props) {
        super(props);
        this.selectedNotificationChanged = this.selectedNotificationChanged.bind(this);
    }

    selectedNotificationChanged(evt) {
        evt.preventDefault();
        let id = parseInt(evt.currentTarget.getAttribute("data-id"), 10);
        this.props.selectedNotificationChanged(id);
    }

    render() {
        
        let content = null;

        content = (
            <tr data-id={this.props.id} onClick={this.selectedNotificationChanged}>
                <td><div>{this.props.type}</div></td>
                <td><div>{this.props.date}</div></td>
                <td>
                    <div>
                        <Link to="/team-details">
                            <button className="default-btn" type="button">
                                Showing all notification info
                            </button>
                        </Link>
                    </div>
                </td>
            </tr>
        );
        return content;
    }
}


export default NotificationItemComponent;
