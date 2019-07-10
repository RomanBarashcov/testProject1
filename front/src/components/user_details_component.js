import React, {Component} from "react";

class UserDetailsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTeam: "",
            showUserBlockingForm: false,
            userLiveTeamForm: false,
            blockedReson: "",
            liveReason: ""
        };

        this.changeTeamHandler = this.changeTeamHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.openBlockingFormHandler = this.openBlockingFormHandler.bind(this);
        this.openLiveFormHandler = this.openLiveFormHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
        this.cancelLiveFormHandler = this.cancelLiveFormHandler.bind(this);

        this.blockingHandler = this.blockingHandler.bind(this);

        this.textAreaHandler = this.textAreaHandler.bind(this);
        this.textAreaLiveTeamHandler = this.textAreaLiveTeamHandler.bind(this);

        this.liveTeamHandler = this.liveTeamHandler.bind(this);

        this._renderSelectList = this._renderSelectList.bind(this);
        this._renderButtonsBlock = this._renderButtonsBlock.bind(this);
        this._renderLiveFromTeamButton = this._renderLiveFromTeamButton.bind(this);
        this._renderLiveUserTeamForm = this._renderLiveUserTeamForm.bind(this);
    };

    changeTeamHandler(evt) {
        let { value } = evt.target;
        this.setState({selectedTeam: value});
    };

    onSubmit(evt) {
        evt.preventDefault();
        const { selectedTeam } = this.state;

        if(!selectedTeam) return;

        const userId = this.props.data.userInfo.user.id;
        this.props.actions.userTeamChange(userId, selectedTeam);
    };

    openBlockingFormHandler() {
        this.setState({showUserBlockingForm: true, userLiveTeamForm: false});
    }

    cancelHandler() {
        this.setState({showUserBlockingForm: false});
    };

    openLiveFormHandler() {
        this.setState({userLiveTeamForm: true, showUserBlockingForm: false});
    };

    cancelLiveFormHandler() {
        this.setState({userLiveTeamForm: false});
    };

    liveTeamHandler() {

        if(window.confirm("Are you sure, do you want left the team?")) {

            if(!this.state.liveReason) {
                alert("Please set main reason!");
                return;
            };

            const userId = this.props.data.userInfo.user.id;
            const teamId = this.props.data.userInfo.user["Teams.id"];
            const isLeft = this.props.data.userInfo.user["Teams.TeamPlayers.is_left"] === 1 ? true : false;

            this.setState({userLiveTeamForm: false});
            
            this.props.actions.userLiveTeam(userId, this.state.liveReason, teamId, !isLeft);

        }
    }

    blockingHandler() {

        this.setState({showUserBlockingForm: false});
        if(!this.state.blockedReson) {
            alert("Please set main reason!");
            return;
        }

        const userId = this.props.data.userInfo.user.id;

        if(this.props.data.userInfo.user["State.type"] === "approve") {
             this.props.actions.blockingUser(userId, this.state.blockedReson);
        } else {
             this.props.actions.unblockingUser(userId, this.state.blockedReson);
        }

    };

    textAreaHandler(evt) {
        let { value } = evt.target;
        this.setState({blockedReson: value});
    };


    textAreaLiveTeamHandler(evt) {
        let { value } = evt.target;
        this.setState({liveReason: value});
    };

    _renderButtonsBlock() {

        let content = "";
        if(this.props.data.myProfile === undefined || this.props.data.myProfile === null) return content;

        const isLeft = this.props.data.userInfo.user["Teams.TeamPlayers.is_left"] === 1 ? true : false;

        if(this.props.data.myProfile["Role.type"] !== "player" &&
             this.props.data.myProfile.id !== this.props.data.userInfo.user.id) {

                content = (<div className="row justify-content-sm-center">             
                    <div className="col col-sm-2">
                        {!isLeft && 
                            <button className="btn btn-success" onClick={this.onSubmit}>Save</button>}
                    </div>
                    <div className="col col-sm-2">
                     { !this.state.showUserBlockingForm && <button className="btn btn-danger" onClick={this.openBlockingFormHandler}>Bloking</button> }
                    </div>
           </div>);
        } 

        return content;
    }

    _renderLiveFromTeamButton() {

        let content = "";

        if(this.props.data.myProfile === undefined || this.props.data.myProfile === null) return content;
        
        const isLeft = this.props.data.userInfo.user["Teams.TeamPlayers.is_left"] === 1 ? true : false;
        const buttonText = isLeft ? "Discard Live": "Live";

        if(this.props.data.myProfile["Role.type"] !== "player" &&
             this.props.data.myProfile.id !== this.props.data.userInfo.user.id) {
                content = (<div className="col-sm-4"><button className="btn btn-warning" onClick={this.openLiveFormHandler}>{buttonText}</button></div>);
             }

        return content;
    }

    _rednderUserBlockingForm() {

        let content = null;

        const buttonText = this.props.data.userInfo.user["State.type"] === "approve" ? "Blocking" : "Unblocking";
        const headerText = this.props.data.userInfo.user["State.type"] === "approve" ? "Blocking User" : "Unblocking User";

        content = ( <div className="row justify-content-sm-center">
                        <div className="card col-sm-6">
                             <div className="card-body">
                                <br />
                                    <h2>{headerText}</h2>
                                <br />
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Main Reason</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue={this.state.blockedReson} onChange={this.textAreaHandler}></textarea>
                                </div>
                                <div className="row justify-content-sm-center">
                                    <div className="col col-sm-2">
                                        <button className="btn btn-warning" onClick={this.cancelHandler}>Cancel</button>
                                    </div>
                                    <div className="col col-sm-2">
                                        <button className="btn btn-danger" onClick={this.blockingHandler}>{buttonText}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>);

        return content;
    };

    _renderLiveUserTeamForm() {

        let content = null;
        const isLeft = this.props.data.userInfo.user["Teams.TeamPlayers.is_left"] === 1 ? true : false;

        const headerText = isLeft ? "Discard Player Live Team" : "Player Live Team";
        const buttonText = isLeft ? "Discard" : "Live";

        content = ( <div className="row justify-content-sm-center">
                        <div className="card col-sm-6">
                            <div className="card-body">
                                <br />
                                    <h2>{headerText}</h2>
                                <br />
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Main Reason</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue={this.state.liveReason} onChange={this.textAreaLiveTeamHandler}></textarea>
                                </div>
                                <div className="row justify-content-sm-center">
                                    <div className="col col-sm-2">
                                        <button className="btn btn-warning" onClick={this.cancelLiveFormHandler}>Cancel</button>
                                    </div>
                                    <div className="col col-sm-2">
                                        <button className="btn btn-danger" onClick={this.liveTeamHandler}>{buttonText}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>);

        return content;
    };

    _renderSelectList() {

        let content = "";
        const isLeft = this.props.data.userInfo.user["Teams.TeamPlayers.is_left"] === 1 ? true : false;

        if(isLeft) {

            content = (<div className="alert alert-warning" role="alert">
                         Player left from team: {this.props.data.userInfo.user["Teams.name"]}
                     </div>);

        } else {
           content = (<select className="selectpicker" defaultValue={this.props.data.userInfo.user["Teams.id"]} onChange={this.changeTeamHandler}>
                        {
                            this.props.data.teams.list.map((team, index) => (
                                <option value={team.id} key={index}>
                                    {team.name}
                                </option>
                            ))
                        }
                      </select>);
        }

        return content;
    }

    _renderUserDetails() {

        let content = null;
        let userInfoText = "";

        const userRoleInfo = this.props.data.userInfo.user["Role.type"];

        if(userRoleInfo === "player") {
            userInfoText = "Player Info";
        } else if (userRoleInfo === "manager") {
            userInfoText = "Manager Info";
        }


        content = (
                    <div className="row justify-content-sm-center">
                        <div className="card col-sm-6">
                            <div className="card-body">
                                <br/>
                                    <h2>{userInfoText}</h2>
                                <br/>
                                <hr />
                                    <div className="form-group row">
                                        <label htmlFor="TeamName" className="col-sm-4 col-form-label">Name</label>
                                        <div className="col-sm-4">
                                            <input type="text" readOnly className="form-control-plaintext" id="TeamName" value={this.props.data.userInfo.user.name} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                    <label htmlFor="Description" className="col-sm-4 col-form-label">Email</label>
                                        <div className="col-sm-4">
                                            <input type="text" readOnly className="form-control-plaintext" id="Description" value={this.props.data.userInfo.user.email} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                    <label htmlFor="Role" className="col-sm-4 col-form-label">Role</label>
                                        <div className="col-sm-4">
                                            <input type="text" readOnly className="form-control-plaintext" id="Role" value={this.props.data.userInfo.user["Role.type"]} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                    <label htmlFor="State" className="col-sm-4 col-form-label">State</label>
                                        <div className="col-sm-4">
                                            <input type="text" readOnly className="form-control-plaintext" id="State" value={this.props.data.userInfo.user["State.type"]} />
                                        </div>
                                    </div>
                                    {
                                        userRoleInfo === "player" &&
                                        <div className="form-group row">
                                            <label htmlFor="Team" className="col-sm-4 col-form-label">Team</label>
                                            <div className="col-sm-4">
                                                {this._renderSelectList()}
                                            </div>
                                            
                                            {this._renderLiveFromTeamButton()}

                                        </div> 
                                    }
                                    <hr />
                                   {this._renderButtonsBlock()}
                            </div>
                        </div>
                </div>
        );

        return content;
    };

    render() {

        let content = null;

        if (this.props.data.userInfo.loading) {
            content = (<div className="content">
                        <span> Loading ...</span>
                    </div>);
        }

        if(this.props.data.userInfo.loaded && this.props.data.userInfo.user) {
            content = (
                <div>
                    <br />
                    {this._renderUserDetails()}
                    <br />
                    {this.state.showUserBlockingForm && this._rednderUserBlockingForm()}
                    {this.state.userLiveTeamForm && this._renderLiveUserTeamForm()}
                </div>
            );
        }
        

        return content;
    };
}

export default UserDetailsComponent;
