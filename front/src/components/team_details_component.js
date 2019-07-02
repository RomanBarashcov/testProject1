import React, {Component} from "react";
import UserItemComponent from "./user_item_component";

class TeamDetailsComponent extends Component {
    
    constructor(props) {
        super(props);
        this.selectedUserChanged = this.selectedUserChanged.bind(this);
    }

    selectedUserChanged(userId) {
        this.props.actions.loadUserInfo(userId);
    }

    _renderTeamDetails() {

        let content = null;

        content = (
            <div>
                <br />
                <h2>Team Info</h2>
                <hr/>
                <form>
                    <div className="form-group row">
                        <label htmlFor="TeamName" className="col-sm-4 col-form-label">Name</label>
                        <div className="col-sm-4">
                            <input type="text" readOnly className="form-control-plaintext" id="TeamName" value={this.props.data.team.name} />
                        </div>
                    </div>
                    <div className="form-group row">
                     <label htmlFor="Description" className="col-sm-4 col-form-label">Description</label>
                        <div className="col-sm-4">
                            <input type="text" readOnly className="form-control-plaintext" id="Description" value={this.props.data.team.description} />
                        </div>
                    </div>
                    <div className="form-group row">
                     <label htmlFor="TotalSocre" className="col-sm-4 col-form-label">Total Score</label>
                        <div className="col-sm-4">
                            <input type="text" readOnly className="form-control-plaintext" id="TotalSocre" value={this.props.data.team.total_score} />
                        </div>
                    </div>
                </form>
                </div>
        );

        return content;
    }

    _renderTeamPlayers() {
        
        let content = null;

        if (this.props.data.loaded) {
            content = (
                <div>
                    <br />
                        <h2>Team Players</h2>
                    <br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"><div>#</div></th>
                                <th scope="col"><div>Player Email</div></th>
                                <th scope="col"><div>Player Name</div></th>
                                <th scope="col"><div></div></th>
                            </tr>
                        </thead>
                        <tbody>
                        {

                            this.props.data.team.teamPlayers.map((player, index) => {
                                return (
                                    <UserItemComponent
                                        key={index}
                                        userId={player.id}
                                        email={player.email}
                                        name={player.name}
                                        selectedUserChanged={this.selectedUserChanged}/>
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

    render() {
        let content = null;

        if (this.props.data.loading) {
            return (<div className="content">
                            <span> Loading ...</span>
                    </div>);
        }

        content = (
            <div>
                {this._renderTeamDetails()}
                {this._renderTeamPlayers()}
            </div>
        )
        

        return content;
    }
}

export default TeamDetailsComponent;
