import React, {Component} from "react";
import UserDetailsTextAreaComponent from "./user_details_text_area_component";
import * as notificationTypes from "../constants/notification_types";

class UserDetailsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTeam: "",
            showUserBlockingForm: false,
            showUserLiveTeamForm: false,
            showApproveUserLiveTeamForm: false,
            blockedReson: "",
            liveReason: "",
            approveReason: ""
        };

        this.changeTeamHandler = this.changeTeamHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        
        // ### Open TeaxtArea Handlers ###
        // #####################################################
        this.openBlockingFormHandler = this.openBlockingFormHandler.bind(this);
        this.openLiveFormHandler = this.openLiveFormHandler.bind(this);
        this.openApproveFormHandler = this.openApproveFormHandler.bind(this);
        // #####################################################


        // ### Cancel TeaxtArea Handlers ###
        // #####################################################
        this.cancelButtonBlockUserHandler = this.cancelButtonBlockUserHandler.bind(this);
        this.cancelButtonLiveFormHandler = this.cancelButtonLiveFormHandler.bind(this);
        this.cancelApproveFormHandler = this.cancelApproveFormHandler.bind(this);
        // #####################################################


        // ### TeaxtArea Handlers ###
        // #####################################################
        this.blockedUserTextAreaHandler = this.blockedUserTextAreaHandler.bind(this);
        this.liveTextAreaTeamHandler = this.liveTextAreaTeamHandler.bind(this);
        this.approveLiveTextAreaHandler = this.approveLiveTextAreaHandler.bind(this);
        // #####################################################


        // ### TextArea Senders data handlers ###  
        // #####################################################
        this.blockingButtonHandler = this.blockingButtonHandler.bind(this);
        this.liveTeamButtonHandler = this.liveTeamButtonHandler.bind(this);
        this.approveLiveButtonFormHandler = this.approveLiveButtonFormHandler.bind(this);
        // #####################################################


        // ### Render contents ###
        // #####################################################
        this._renderSelectList = this._renderSelectList.bind(this);
        this._renderButtonsBlock = this._renderButtonsBlock.bind(this);
        this._renderLiveFromTeamButton = this._renderLiveFromTeamButton.bind(this);
        this._renderLiveUserTeamForm = this._renderLiveUserTeamForm.bind(this);
        // #####################################################
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

    // ### Open TextArea buttons handlers ###
    // #####################################################

    openBlockingFormHandler() {
        this.setState({
            showUserBlockingForm: true, 
            showUserLiveTeamForm: false, 
            showApproveUserLiveTeamForm: false
        });
    }

    openLiveFormHandler() {
        this.setState({
            showUserBlockingForm: false, 
            showUserLiveTeamForm: true,
            showApproveUserLiveTeamForm: false
        });
    };

    openApproveFormHandler() {
        this.setState({ 
            showUserLiveTeamForm: false, 
            showUserBlockingForm: false, 
            showApproveUserLiveTeamForm: true
        });
    }

    // #####################################################


    // ### Close TextArea buttons handlers ###
    // #####################################################

    cancelButtonBlockUserHandler() {
        this.setState({showUserBlockingForm: false});
    };

    cancelButtonLiveFormHandler() {
        this.setState({showUserLiveTeamForm: false});
    };

    cancelApproveFormHandler() {
        this.setState({showApproveUserLiveTeamForm: false});
    }

    // #####################################################


    // ### TextArea Handlers ###
   // #####################################################

    blockedUserTextAreaHandler(evt) {
        let { value } = evt.target;
        this.setState({blockedReson: value});
    };

    liveTextAreaTeamHandler(evt) {
        let { value } = evt.target;
        this.setState({liveReason: value});
    };

    approveLiveTextAreaHandler(evt) {
        let { value } = evt.target;
        this.setState({approveReason: value});
    }

    // #####################################################


    // ### TextArea Senders data handlers ###  
    // #####################################################

    liveTeamButtonHandler() {

        if(window.confirm("Are you sure, do you want left the team?")) {

            if(!this.state.liveReason) {
                alert("Please set main reason!");
                return;
            };

            const userId = this.props.data.userInfo.user.id;
            const teamId = this.props.data.userInfo.user["Teams.id"];
            const isLeft = this.props.data.userInfo.user["Teams.TeamPlayers.is_left"] === 1 ? true : false;

            this.setState({showUserLiveTeamForm: false});
            
            this.props.actions.userLiveTeam(userId, this.state.liveReason, teamId, !isLeft);

        }
    }

    blockingButtonHandler() {

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

    approveLiveButtonFormHandler() {
        if(window.confirm("Are you sure, do you want remove player from team?")) {

            if(!this.state.approveReason) {
                alert("Please set main reason!");
                return;
            };

            const currentProfileRole = this.props.data.myProfile["Role.type"];
            if(currentProfileRole === "player") return;

            const userId = this.props.data.userInfo.user.id;
            const teamId = this.props.data.userInfo.user["Teams.id"];
            const isLeft = true;

            this.setState({showUserLiveTeamForm: false});
            
            this.props.actions.userLiveTeam(userId, this.state.approveReason, teamId, isLeft);

        }
    }

    // #####################################################

    _renderButtonsBlock() {

        let content = "";
        if(this.props.data.myProfile === undefined || this.props.data.myProfile === null) return content;

        const isLeft = this.props.data.userInfo.user["Teams.TeamPlayers.is_left"] === 1 ? true : false;

        const currentUserRole = this.props.data.myProfile["Role.type"];
        const myProfileId = this.props.data.myProfile.id;
        const userInfoId = this.props.data.userInfo.user.id;

        const accsesSaveButton = (currentUserRole === "player" && myProfileId === userInfoId 
                                || this.props.data.myProfile["Role.type"] !== "player");

        const accsessBlockButton = currentUserRole !== "player";

        content = (<div className="row justify-content-sm-center">             
            <div className="col col-sm-2">
                {(!isLeft && accsesSaveButton) && 
                    <button className="btn btn-success" onClick={this.onSubmit}>Save</button>
                }
            </div>
            <div className="col col-sm-2">
                { (!this.state.showUserBlockingForm && accsessBlockButton) && 
                    <button className="btn btn-danger" onClick={this.openBlockingFormHandler}>Bloking</button> 
                }
            </div>
        </div>);


        return content;
    }

    _renderLiveFromTeamButton() {

        if(this.props.data.myProfile === undefined || this.props.data.myProfile === null) return content;
        
        const currentProfileRole = this.props.data.myProfile["Role.type"];
        const isLeft = this.props.data.userInfo.user["Teams.TeamPlayers.is_left"] === 1 ? true : false;
        const buttonLiveText = isLeft ? "Discard Live": "Live";
        const userTeamStateId = this.props.data.userInfo.user["Teams.TeamPlayers.stateId"];
        const state = this.props.data.states.filter(i => i.id === userTeamStateId)[0];

        let buttonApproveLiveText = "";
        let accsesToApprove = false;

        const myProfileId = this.props.data.myProfile.id;
        const userInfoId = this.props.data.userInfo.user.id;
        const fromUserId = this.props.data.userInfo.user["Teams.TeamPlayers.fromUserId"];

        if(state.type === "pending") {

            buttonApproveLiveText = isLeft ? "Approve Live" : "Approve Discard";
            accsesToApprove = (currentProfileRole !== "player"
                                && myProfileId !== userInfoId);

        }

        const accsesToLive = ((currentProfileRole === "player" && myProfileId === userInfoId && !isLeft)
                             || (currentProfileRole === "player" && myProfileId === userInfoId && isLeft && myProfileId === fromUserId)
                             || (currentProfileRole !== "player"));

        const content = (<div className="col-sm-4">
                    { accsesToApprove &&
                        <p>
                            <button className="btn btn-success" onClick={this.openApproveFormHandler}>{buttonApproveLiveText}</button>
                        </p>
                    }
                    { accsesToLive &&
                        <p>
                            <button className="btn btn-warning" onClick={this.openLiveFormHandler}>{buttonLiveText}</button>
                        </p>
                    }
            </div>);

        return content;
    }

    _rednderUserBlockingForm() {

        const buttonText = this.props.data.userInfo.user["State.type"] === "approve" ? "Blocking" : "Unblocking";
        const headerText = this.props.data.userInfo.user["State.type"] === "approve" ? "Blocking User" : "Unblocking User";

        const content = (<UserDetailsTextAreaComponent 
            headerText = {headerText}
            textAreaHandler = {this.blockedUserTextAreaHandler}
            defaultValue = {this.state.blockedReson}
            cancelButtonHandler = {this.cancelButtonBlockUserHandler}
            customButtonText = {buttonText}
            customButtonHandler = {this.blockingButtonHandler} />);

        return content;
    };

    _renderLiveUserTeamForm() {

        const isLeft = this.props.data.userInfo.user["Teams.TeamPlayers.is_left"] === 1 ? true : false;
        const headerText = isLeft ? "Discard Player Live Team" : "Player Live Team";
        const buttonText = isLeft ? "Discard" : "Live";

        const content = (<UserDetailsTextAreaComponent 
            headerText = {headerText}
            textAreaHandler = {this.liveTextAreaTeamHandler}
            defaultValue = {this.state.liveReason}
            cancelButtonHandler = {this.cancelButtonLiveFormHandler}
            customButtonText = {buttonText}
            customButtonHandler = {this.liveTeamButtonHandler} />);

        return content;
    };

    _renderApproveLiveUserTeamForm() {

        const headerText = "Approve Left User Team";
        const buttonText = "Approve";

        const content = (<UserDetailsTextAreaComponent 
            headerText = {headerText}
            textAreaHandler = {this.approveLiveTextAreaHandler}
            defaultValue = {this.state.approveReason}
            cancelButtonHandler = {this.cancelApproveFormHandler}
            customButtonText = {buttonText}
            customButtonHandler = {this.approveLiveButtonFormHandler} />);

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

        let userInfoText = "";

        const userRoleInfo = this.props.data.userInfo.user["Role.type"];
        let teamStateId = this.props.data.userInfo.user["Teams.TeamPlayers.stateId"];
        const teamState = this.props.data.states.filter(i => i.id === teamStateId)[0];

        if(userRoleInfo === "player") {
            userInfoText = "Player Info";
        } else if (userRoleInfo === "manager") {
            userInfoText = "Manager Info";
        }

        const content = (<div className="row justify-content-sm-center">
                        <div className="card col-sm-8">
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
                                    <div className="form-group row">
                                    <label htmlFor="State" className="col-sm-4 col-form-label">Team State</label>
                                        <div className="col-sm-4">
                                            <input type="text" readOnly className="form-control-plaintext" id="State" value={teamState.type} />
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
                    {this.state.showUserLiveTeamForm && this._renderLiveUserTeamForm()}
                    {this.state.showApproveUserLiveTeamForm && this._renderApproveLiveUserTeamForm()}
                </div>
            );
        }
        

        return content;
    };
}

export default UserDetailsComponent;
