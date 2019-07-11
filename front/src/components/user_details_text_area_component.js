import React, {Component} from "react";


class UserDetailsTextAreaComponent extends Component {
    
    constructor(props) {
        super(props);

        this.textAreaHandler = this.textAreaHandler.bind(this);
        this.cancelButtonHandler = this.cancelButtonHandler.bind(this);
        this.customButtonHandler = this.customButtonHandler.bind(this);
    }

    textAreaHandler(evt) {
        this.props.textAreaHandler(evt);
    }

    cancelButtonHandler() {
        this.props.cancelButtonHandler();
    }

    customButtonHandler() {
        this.props.customButtonHandler();
    }
    

    render() {

        const customButtonText = this.props.customButtonText;
        const headerText = this.props.headerText;
        const defaultValue = this.props.defaultValue;

        const content = ( <div className="row justify-content-sm-center">
                        <div className="card col-sm-8">
                             <div className="card-body">
                                <br />
                                    <h2>{headerText}</h2>
                                <br />
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Main Reason</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue={defaultValue} onChange={this.textAreaHandler}></textarea>
                                </div>
                                <div className="row justify-content-sm-center">
                                    <div className="col col-sm-2">
                                        <button className="btn btn-warning" onClick={this.cancelButtonHandler}>Cancel</button>
                                    </div>
                                    <div className="col col-sm-2">
                                        <button className="btn btn-primary" onClick={this.customButtonHandler}>{customButtonText}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>);

        return content;
    }
}


export default UserDetailsTextAreaComponent;
