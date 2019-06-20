import React, {Component} from "react";
import { Link } from "react-router-dom";

class HeaderComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        let content = null;

        content = (
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <Link to="/" class="nav-link">
                         Home
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="/teams" class="nav-link">
                         Teams
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="/users" class="nav-link">
                         Users
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="/players" class="nav-link">
                        Players
                    </Link>
                </li>
            </ul>
        );
        return content;
    }
}


export default (HeaderComponent);
