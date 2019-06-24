import React, {Component} from "react";
import { Link } from "react-router-dom";

class LoginComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
          };
      
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(evt) {
        evt.preventDefault();
    
        const { name, email, password, confirmPassword } = this.state;
        this.props.actions.registrate(name, email, password, confirmPassword);
    }

    render() {
        const { name, email, password, confirmPassword } = this.state;

        let content = null;

        content = (<div>
                        <h1>Login</h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label for="exampleInputName1">Name</label>
                                <input type="text" className="form-control" id="exampleInputName1" placeholder="Enter Name" value={name} />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword2">Password (Confirm)</label>
                                <input type="password" className="form-control" id="exampleInputPassword2" aria-describedby="passwordConfirmHelp" placeholder="Password" value={confirmPassword} />
                                <small id="passwordConfirmHelp" className="form-text text-muted">Pleas confirm your password.</small>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
        );
        return content;
    }
}


export default LoginComponent;
