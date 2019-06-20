import React, {Component} from "react";
import { Link } from "react-router-dom";

class LoginComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
          };
      
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(evt) {
        evt.preventDefault();
    
        const { email, password } = this.state;
        this.props.actions.signIn(email, password);
    }

    render() {
        const { email, password } = this.state;

        let content = null;

        content = (<div>
                        <h1>Login</h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
        );
        return content;
    }
}


export default  (LoginComponent);
