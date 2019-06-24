import React, {Component} from "react";
import { Link } from "react-router-dom";

class HeaderComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        let content = null;

        content = (
            <ul className="nav justify-content-center">
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
                <li className="nav-item">
                    <Link to="/players" className="nav-link">
                        Players
                    </Link>
                </li>
            </ul>
        );

        return content;
    }
}


export default HeaderComponent;
