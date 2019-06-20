import React from 'react'
import createHistory from "history/createBrowserHistory";
import { Router, Route } from "react-router-dom";

import HeaderComponent from "./header_component";
import UsersContainer from "../containers/users_container";
import UserDetailsContainer from "../containers/user_details_container";
import TeamsContainer from "../containers/teams_container";
import TeamDetailsContainer from "../containers/team_details_container";
import LoginContainer from "../containers/login_container";
import RegistrationContainer from "../containers/registration_container";

export const history = createHistory();

const path = (/#!(\/.*)$/.exec(history.location.hash) || [])[1];
if (path) {
  history.replace(path);
}

const HomePage = () => (
  <LoadDataContainer>
    <HeaderComponent/>
      <HomeContainer />
    <FooterComponent/>
  </LoadDataContainer>
);

const UsersPage = () => (
  <LoadDataContainer>
   <HeaderComponent/>
      <UsersContainer />
    <FooterComponent/>
  </LoadDataContainer>
);

const UserDetailsPage = () => (
  <LoadDataContainer>
   <HeaderComponent/>
     <UserDetailsContainer />
    <FooterComponent/>
  </LoadDataContainer>
);

const TeamsPage = () => (
  <LoadDataContainer>
    <HeaderComponent/>
      <TeamsContainer />
    <FooterComponent/>
  </LoadDataContainer>
);

const TeamDetailsPage = () => (
  <LoadDataContainer>
    <HeaderComponent/>
      <TeamDetailsContainer />
    <FooterComponent/>
  </LoadDataContainer>
);

const NotificationsPage = () => (
  <LoadDataContainer>
    <HeaderComponent/>
      <NotificationsContainer />
    <FooterComponent/>
  </LoadDataContainer>
);

const LoginPage = () => (
  <LoginContainer />
);

const RegisterPage = () => (
  <RegistrationContainer />
);


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
          <React exact path="/register" component={RegisterPage} />
        </div>
      </Router>);
      }
}

export default App