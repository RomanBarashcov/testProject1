import React, {Component} from 'react'
import { Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import LoadDataContainer from "../containers/load_data_container";
import HeaderContainer from "../containers/header_container";
import HomeContainer from "../containers/home_container";
import UsersContainer from "../containers/users_container";
import UserDetailsContainer from "../containers/user_details_container";
import TeamsContainer from "../containers/teams_container";
import TeamDetailsContainer from "../containers/team_details_container";
import NotificationsContainer from "../containers/notifications_container";
import LoginContainer from "../containers/login_container";
import RegistrationContainer from "../containers/registration_container";

var createHistory = require("history").createBrowserHistory;
export const history = createHistory();

const path = (/#!(\/.*)$/.exec(history.location.hash) || [])[1];
if (path) {
  history.replace(path);
}

const HomePage = () => {
    return(
      <LoadDataContainer>
        <HeaderContainer/>
          <HomeContainer />
      </LoadDataContainer>
    );
  };

const UsersPage = () => {
  return (
    <LoadDataContainer>
    <HeaderContainer/>
        <UsersContainer />
    </LoadDataContainer>
  );
};

const UserDetailsPage = () => {
  return (
    <LoadDataContainer>
    <HeaderContainer/>
      <UserDetailsContainer />
    </LoadDataContainer>
  );
};

const TeamsPage = () => {
  return (
    <LoadDataContainer>
      <HeaderContainer/>
        <TeamsContainer />
    </LoadDataContainer>
  );
};

const TeamDetailsPage = () => {
  return (
    <LoadDataContainer>
      <HeaderContainer/>
        <TeamDetailsContainer />
    </LoadDataContainer>
  );
};

const NotificationsPage = () => {
  return (
    <LoadDataContainer>
      <HeaderContainer/>
        <NotificationsContainer />
    </LoadDataContainer>
  );
};

const LoginPage = () => {
  return (<LoginContainer />);
};

const RegisterPage = () => {
  return (<RegistrationContainer />);
};


class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="container">
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/users" component={UsersPage}/>
          <Route exact path="/user-details" component={UserDetailsPage} />
          <Route exact path="/teams" component={TeamsPage} />
          <Route exact path="/team-details" component={TeamDetailsPage} />
          <Route exact path="/notifications" component={NotificationsPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </div>
      </Router>);
      }
}

export default App