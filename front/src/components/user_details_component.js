import React, {Component} from "react";

class UserDetailsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTeam: "",
            showUserBlockingForm: false,
            blockedReson: ""
        };

        this.changeTeamHandler = this.changeTeamHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.openBlockingFormHandler = this.openBlockingFormHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
        this.blockingHandler = this.blockingHandler.bind(this);
        this.textAreaHandler = this.textAreaHandler.bind(this);
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
        this.setState({showUserBlockingForm: true});
    }

    cancelHandler() {
        this.setState({showUserBlockingForm: false});
    };

    blockingHandler() {

        this.setState({showUserBlockingForm: false});
        if(!this.state.blockedReson) return;
        alert(this.state.blockedReson);

    };

    textAreaHandler(evt) {
        let { value } = evt.target;
        this.setState({blockedReson: value});
    };

    _rednderUserBlockingForm() {

        let content = null;
        
        content = ( <div className="row justify-content-sm-center">
                        <div className="card col-sm-6">
                             <div className="card-body">
                                <br />
                                    <h2>Blocking user </h2>
                                <br />
                                <form onSubmit={this.blockingHandler}>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">Main Reason</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue={this.state.blockedReson} onChange={this.textAreaHandler}></textarea>
                                    </div>
                                    <div className="row justify-content-sm-center">
                                       <div className="col col-sm-2">
                                            <button className="btn btn-warning" onChange={this.cancelHandler}>Cancel</button>
                                       </div>
                                       <div className="col col-sm-2">
                                            <button className="btn btn-danger">Blocking</button>
                                        </div>
                                   </div>
                                </form>
                            </div>
                        </div>
                    </div>);

        return content;
    };

    _renderUserDetails() {

        let content = null;

        content = (
                    <div className="row justify-content-sm-center">
                        <div className="card col-sm-6">
                            <div className="card-body">
                                <br/>
                                    <h2>Player Info</h2>
                                <br/>
                                <hr />
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group row">
                                        <label htmlFor="TeamName" className="col-sm-6 col-form-label">Name</label>
                                        <div className="col-sm-6">
                                            <input type="text" readOnly className="form-control-plaintext" id="TeamName" value={this.props.data.userInfo.user.name} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                    <label htmlFor="Description" className="col-sm-6 col-form-label">Email</label>
                                        <div className="col-sm-6">
                                            <input type="text" readOnly className="form-control-plaintext" id="Description" value={this.props.data.userInfo.user.email} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                    <label htmlFor="Role" className="col-sm-6 col-form-label">Role</label>
                                        <div className="col-sm-6">
                                            <input type="text" readOnly className="form-control-plaintext" id="Role" value={this.props.data.userInfo.user["Role.type"]} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                    <label htmlFor="State" className="col-sm-6 col-form-label">State</label>
                                        <div className="col-sm-6">
                                            <input type="text" readOnly className="form-control-plaintext" id="State" value={this.props.data.userInfo.user["State.type"]} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                    <label htmlFor="Team" className="col-sm-6 col-form-label">Team</label>
                                            <select className="selectpicker" defaultValue={this.props.data.userInfo.user["Teams.id"]} onChange={this.changeTeamHandler}>
                                            {
                                                this.props.data.teams.list.map((team, index) => (
                                                    <option value={team.id} key={index}>
                                                        {team.name}
                                                    </option>
                                                ))  
                                            }
                                            </select>
                                    </div>
                                    <hr />
                                    <div className="row justify-content-sm-center">
                                        
                                         <div className="col col-sm-2">
                                            <button type="submit" className="btn btn-success">Save</button>
                                        </div>
                                        <div className="col col-sm-2">
                                            { !this.state.showUserBlockingForm && <button className="btn btn-danger" onClick={this.openBlockingFormHandler}>Bloking</button> }
                                         </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
        );

        return content;
    };

    render() {
        let content = null;

        if (this.props.data.userInfo.loading) {
            return (<div className="content">
                        <span> Loading ...</span>
                    </div>);
        }

        content = (
            <div>
                <br />
                {this._renderUserDetails()}
                <br />
                {this.state.showUserBlockingForm && this._rednderUserBlockingForm()}
            </div>
        )
        

        return content;
    };
}

export default UserDetailsComponent;
