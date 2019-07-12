import React, {Component} from "react";
import { Link } from "react-router-dom";

class LoginComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
          };

        this.emailHandleChange = this.emailHandleChange.bind(this);
        this.passwordHandleChange = this.passwordHandleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(evt) {
        evt.preventDefault();
        const { email, password } = this.state;
        this.props.actions.logIn(email, password);
    }

    emailHandleChange(evt) {
        let { value } = evt.target;
        this.setState({email: value});
    }

    passwordHandleChange(evt) {
        let { value } = evt.target;
        this.setState({password: value});
    }

    render() {
        const { email, password } = this.state;

        let content = null;

        content = (<div className="row justify-content-sm-center">
                        <div className="col col-lg-4">
                            <br />
                                <h2>Login</h2>
                            <br />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">
                                        Email address
                                    </label>
                                    <input type="email" 
                                           className="form-control" 
                                           id="exampleInputEmail1" 
                                           aria-describedby="emailHelp"
                                           placeholder="Enter email" 
                                           value={email}
                                           onChange={this.emailHandleChange} />
                                    <small id="emailHelp" 
                                           className="form-text text-muted">
                                               We'll never share your email with anyone else.
                                           </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">
                                        Password
                                    </label>
                                    <input type="password" 
                                           className="form-control" 
                                           id="exampleInputPassword1" 
                                           placeholder="Password" 
                                           value={password} 
                                           onChange={this.passwordHandleChange}/>
                                </div>
                                <button type="submit" 
                                        className="btn btn-primary">
                                            Submit
                                        </button>
                                        <Link to="/register" className="btn btn-deffault">
                                                Registrate
                                        </Link>
                            </form>
                        </div>
                    </div>
        );

        return content;
    }
}


export default  LoginComponent;
