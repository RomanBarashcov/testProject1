import React, {Component} from "react";
import NotificationItemComponent from "./notification_item_component";

class NotificationsComponent extends Component {
    
    constructor(props) {
        super(props);
        this.selectedNotificationChanged = this.selectedNotificationChanged.bind(this);
    }

    selectedNotificationChanged(notificationId) {
        this.props.actions.loadNotificationInfo(notificationId);
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
                        <h1>Notifications</h1>
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
                                this.props.data.notifications.map((notification, index) => {
                                    return (
                                        <NotificationItemComponent
                                            key={index}
                                            id={notification.id}
                                            type={notification.type}
                                            date={notification.date}
                                            selectedNotificationChanged={this.selectedNotificationChanged}/>
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
