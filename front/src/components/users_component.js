import React, {Component} from "react";
import UserItemComponent from "./user_item_componet";

class UsersComponent extends Component {
    
    constructor(props) {
        super(props);
        this.selectedUserChanged = this.selectedUserChanged.bind(this);
    }

    selectedUserChanged(userId) {
        this.props.actions.loadUserInfo(userId);
    }

    render() {

        let content = null;

        if (this.props.data.loading) {
            return (<div className="content">
                        <span> Loading ...</span>
                    </div>);
        }

        if (this.props.data.loaded) {

            content = (
                <div>
                    <div className="row">
                        <h1>Users</h1>
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
                                this.props.data.users.map((user, index) => {
                                    return (
                                        <UserItemComponent
                                            key={index}
                                            userId={user.id}
                                            email={user.email}
                                            name={user.screenName}
                                            selectedUserChanged={this.selectedUserChanged}/>
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
}

export default (UsersComponent);
