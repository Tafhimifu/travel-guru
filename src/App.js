import React,{ createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Component/Home/Home/Home';
import Booking from './Component/Home/Booking/Booking';
import Login from './Component/Home/Login/Login';
import Searching from './Component/Home/Searching/Searching'
import PrivateRoute from './Component/Home/PrivateRoute/PrivateRoute';
import NoMatch from './Component/Home/NoMatch/NoMatch';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
	const [signOutUser, setSignOutUser] = useState({});
  return (
    <div>
      <UserContext.Provider value={([loggedInUser, setLoggedInUser], [signOutUser, setSignOutUser])}>
        <Router>
          <Switch>
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/booking/:id">
              <Booking></Booking>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <PrivateRoute path="/search">
              <Searching/>
            </PrivateRoute>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="*">
              <NoMatch/>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
    
  );
}

export default App;
