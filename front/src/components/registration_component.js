import React, {Component} from "react";
import { Link } from "react-router-dom";

class LoginComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            selectedTeam: 1
        };
      
        this.errorRender = this.errorRender.bind(this);
        this.nameEnterHandler = this.nameEnterHandler.bind(this);
        this.emailEnterHandler = this.emailEnterHandler.bind(this)
        this.passwordEnterHandler = this.passwordEnterHandler.bind(this);
        this.confirmPasswordEnterHandler = this.confirmPasswordEnterHandler.bind(this);
        this.selectTeamHandler = this.selectTeamHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    errorRender() {
        return (
            <div className="alert alert-danger" role="alert">
                Erorr: {this.props.data.authentification.field} {this.props.data.authentification.status}
            </div>
        );
    }

    nameEnterHandler(evt) {
        let { value } = evt.target;
        this.setState({name: value});
    }

    emailEnterHandler(evt) {
        let { value } = evt.target;
        this.setState({email: value});
    }

    passwordEnterHandler(evt) {
        let { value } = evt.target;
        this.setState({password: value});
    }

    confirmPasswordEnterHandler(evt) {
        let { value } = evt.target;
        this.setState({confirmPassword: value});
    }

    selectTeamHandler(evt) {
        let { value } = evt.target;
        this.setState({selectedTeam: value});
    }

    onSubmit(evt) {

        evt.preventDefault();

        if(password !== confirmPassword) {
            alert("Confirm password is incorrect!");
            return;
        }

        const { name, email, password, confirmPassword, selectedTeam } = this.state;

        debugger;
        this.props.actions.registrate(name, email, password, confirmPassword, selectedTeam);
    }

    render() {

        const { name, email, password, confirmPassword, selectedTeam } = this.state;

        const content = (<div className="row justify-content-sm-center">
                        <div className="col col-lg-4">
                            <br />
                                <h1>Registration</h1>
                            <br/>
                            {this.props.data.authentification.showError && this.errorRender }
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label for="exampleInputName1">Name</label>
                                    <input type="text" className="form-control" id="exampleInputName1" placeholder="Enter Name" value={name} onChange={this.nameEnterHandler} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={this.emailEnterHandler} />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={this.passwordEnterHandler} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword2">Password (Confirm)</label>
                                    <input type="password" className="form-control" id="exampleInputPassword2" aria-describedby="passwordConfirmHelp" placeholder="Password" value={confirmPassword} onChange={this.confirmPasswordEnterHandler} />
                                    <small id="passwordConfirmHelp" className="form-text text-muted">Pleas confirm your password.</small>
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword2">Select team</label>
                                    <select className="selectpicker" defaultValue={selectedTeam} onChange={this.selectTeamHandler}>
                                    {
                                        this.props.data.teams.list.map((team, index) => (
                                            <option value={team.id} key={index}>
                                                {team.name}
                                            </option>
                                        ))
                                    }
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <Link to="/login" className="btn btn-deffault">
                                        Login
                                </Link>
                            </form>
                        </div>
                    </div>
        );
        return content;
    }
}


export default LoginComponent;
