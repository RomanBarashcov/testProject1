import React, {Component} from "react";

class UserDetailsComponent extends Component {
    constructor(props) {
        super(props);
    }

    _renderUserDetails() {

        let content = null;

        content = (
                <form>
                    <div class="form-group row">
                        <label for="TeamName" class="col-sm-4 col-form-label">Name</label>
                        <div class="col-sm-6">
                            <input type="text" readonly class="form-control-plaintext" id="TeamName" value={this.props.data.user_details.name} />
                        </div>
                    </div>
                    <div class="form-group row">
                     <label for="Description" class="col-sm-4 col-form-label">Email</label>
                        <div class="col-sm-6">
                            <input type="text" readonly class="form-control-plaintext" id="Description" value={this.props.data.user_details.email} />
                        </div>
                    </div>
                    <div class="form-group row">
                     <label for="TotalSocre" class="col-sm-4 col-form-label">Role</label>
                        <div class="col-sm-6">
                            <input type="text" readonly class="form-control-plaintext" id="TotalSocre" value={this.props.data.user_details.role} />
                        </div>
                    </div>
                </form>
        );

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
                {this._renderUserDetails()}
            </div>
        )
        

        return content;
    }
}

export default (UserDetailsComponent);