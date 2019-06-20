import React, {Component} from "react";
import UserItemComponent from "./user_item_componet";

class TeamDetailsComponent extends Component {
    
    constructor(props) {
        super(props);
    }

    _renderTeamDetails() {

        let content = null;

        content = (
                <form>
                    <div class="form-group row">
                        <label for="TeamName" class="col-sm-4 col-form-label">Name</label>
                        <div class="col-sm-6">
                            <input type="text" readonly class="form-control-plaintext" id="TeamName" value={this.props.data.team_details.name} />
                        </div>
                    </div>
                    <div class="form-group row">
                     <label for="Description" class="col-sm-4 col-form-label">Description</label>
                        <div class="col-sm-6">
                            <input type="text" readonly class="form-control-plaintext" id="Description" value={this.props.data.team_details.description} />
                        </div>
                    </div>
                    <div class="form-group row">
                     <label for="TotalSocre" class="col-sm-4 col-form-label">Total Score</label>
                        <div class="col-sm-6">
                            <input type="text" readonly class="form-control-plaintext" id="TotalSocre" value={this.props.data.team_details.total_score} />
                        </div>
                    </div>
                </form>
        );

        return content;
    }

    _renderTeamPlayers() {
        
        let content = null;

        if (this.props.data.loaded) {
            content = (
                <div>
                    <div className="row">
                        <h1>Team Players</h1>
                    </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col"><div>#</div></th>
                                    <th scope="col"><div>User Email</div></th>
                                    <th scope="col"><div>User Name</div></th>
                                    <th scope="col"><div></div></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.this.props.data.team_details.players.map((user, index) => {
                                    return (
                                        <UserItemComponent
                                            key={index}
                                            userId={user.id}
                                            email={user.email}
                                            name={user.screenName}/>
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

export default (TeamDetailsComponent);
