import React, {Component} from "react";
import UserItemComponent from "./user_item_component";

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
                    <br/>
                        <h2>Users</h2>
                    <br/>
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
                            this.props.data.list.map((user, index) => {
                                return (
                                    <UserItemComponent
                                        key={index}
                                        userId={user.id}
                                        email={user.email}
                                        name={user.name}
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

export default UsersComponent;
