import React, {Component} from "react";
import TeamItemComponent from "./team_item_component";

class TeamsComponent extends Component {

    constructor(props) {
        super(props);
        this.selectedTeamChanged = this.selectedTeamChanged.bind(this);
    }

    selectedTeamChanged(userId) {
        this.props.actions.loadTeamInfo(userId);
    }

    render() {
        
        let content = null;

        if (this.props.data.loading) {
            return (<div className="content">
                            <span> Loading ...</span>
                    </div>);
        }

        if (this.props.data.loaded) {

            content = (
                <div>
                    <div className="row">
                        <h1>Teams</h1>
                    </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col"><div>#</div></th>
                                    <th scope="col"><div>Name</div></th>
                                    <th scope="col"><div>Total Score</div></th>
                                    <th scope="col"><div></div></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.data.teams.map((team, index) => {
                                    return (
                                        <TeamItemComponent
                                            key={index}
                                            userId={team.id}
                                            email={team.name}
                                            name={user.total_score}
                                            selectedUserChanged={this.selectedTeamChanged}/>
                                    );
                                }, this)
                            }
                            </tbody>
                        </table>
                </div>
            );
        }

        return content;
    }
}

export default (TeamsComponent);
