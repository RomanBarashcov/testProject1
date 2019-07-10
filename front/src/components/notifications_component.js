import React, {Component} from "react";
import NotificationItemComponent from "./notification_item_component";

class NotificationsComponent extends Component {
    
    constructor(props) {
        super(props);
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
                        <h2>Notifications</h2>
                     <br/>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col"><div>#</div></th>
                                    <th scope="col"><div>Type</div></th>
                                    <th scope="col"><div>Message</div></th>
                                    <th scope="col"><div>Data</div></th>
                                    <th scope="col"><div>User</div></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.data.list.map((notification, index) => {
                                    return (
                                        <NotificationItemComponent
                                            key={index}
                                            id={notification.id}
                                            type={notification["NotificationType.type"]}
                                            message={notification["NotificationType.message"]}
                                            date={notification.date} 
                                            user={notification["User.email"]} />
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

export default NotificationsComponent;
