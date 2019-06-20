import React, {Component} from "react";
import { Link } from "react-router-dom";

class UserComponent extends Component {
    
    constructor(props) {
        super(props);
        this.selectedUserChanged = this.selectedUserChanged.bind(this);
    }

    selectedUserChanged(evt){
        evt.preventDefault();
        let id = parseInt(evt.currentTarget.getAttribute("data-id"), 10);
        this.props.selectedUserChanged(id);
    }

    render() {
        let content = null;

        content = (
            <tr data-id={this.props.userId} onClick={this.selectedUserChanged}>
                <td><div>{this.props.userId}</div></td>
                <td><div>{this.props.email}</div></td>
                <td><div>{this.props.name}</div></td>
                <td>
                    <div>
                        <Link to="/user-details" style={{ textDecoration: "unset" }}>
                            <button className="default-btn" type="button">
                                Showing all user info
                            </button>
                        </Link>
                    </div>
                </td>
            </tr>
        );
        return content;
    }
}


export default  (UserComponent);
