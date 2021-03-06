import React, {Component} from "react";
import { Link } from "react-router-dom";

export class HeaderComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        let content = null;
        const userName = this.props.data.myProfile !== null ? this.props.data.myProfile.email : "";
        const currentUserRole = this.props.data.myProfile !== null ? this.props.data.myProfile["Role.type"] : "";

        content = (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/teams" className="nav-link">
                                Teams
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">
                                Users
                            </Link>
                        </li>
                        { currentUserRole !== "player" &&
                            <li className="nav-item">
                                <Link to="/notifications" className="nav-link">
                                    Notifications
                                </Link>
                            </li>
                        }
                       
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/login" className="nav-link">
                                {userName} Log out
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );

        return content;
    }
}

  
export default HeaderComponent;
