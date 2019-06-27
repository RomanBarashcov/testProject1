import React, {Component} from "react";
import { Link } from "react-router-dom";

export class HeaderComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        let content = null;

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
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/login" className="nav-link">
                                Log out
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
