import React, {Component} from "react";
import { Link } from "react-router-dom";

class TeamItemComponent extends Component {

    constructor(props) {
        super(props);
        this.selectedTeamChanged = this.selectedTeamChanged.bind(this);
    }

    selectedTeamChanged(evt) {
        evt.preventDefault();
        let id = parseInt(evt.currentTarget.getAttribute("data-id"), 10);
        console.log("evt.currentTarget.getAttribute ", evt.currentTarget.getAttribute("data-id"));
        this.props.selectedTeamChanged(id);
    }

    render() {
        
        let content = null;

        content = (
            <tr data-id={this.props.id} onClick={this.selectedTeamChanged}>
                <td><div>{this.props.id}</div></td>
                <td><div>{this.props.name}</div></td>
                <td><div>{this.props.total_score}</div></td>
                <td>
                    <div>
                        <Link to="/team-details">
                            <button className="default-btn" type="button">
                                Showing all team info
                            </button>
                        </Link>
                    </div>
                </td>
            </tr>
        );
        return content;
    }
}


export default TeamItemComponent;
