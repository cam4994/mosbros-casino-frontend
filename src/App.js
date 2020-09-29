import React from 'react';
import './App.css';
import './Styling/card.css'
import SignUp from './Containers/SignUp'
import LogIn from './Containers/LogIn'
import Card from './Components/Card'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './Components/NavBar';
import { About } from './Components/About';
import SideBar from './Components/SideBar';

class App extends React.Component {
  State = {
    user: '',
    gameId: 0,
  }

  userCreateOrLogIn = (e, type) => {
    let endpoint
    if (type === "Sign Up") {
      endpoint = 'users'
    } else if (type === "Log In") {
      endpoint = 'login'
    }
    let username = e.target.username.value
    let password = e.target.password.value

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password,
        game_id: 1
      })
    }
    fetch(`http://localhost:3001/${endpoint}`, configObj)
      .then(resp => resp.json())
      .then(user => this.userResponse(user))
  }

  userResponse = (response) => {
    if (response.error) {
      response.error.forEach(error => console.log(error))
    } else {
      localStorage.setItem('Token', response.jwt)
      this.setState({ user: response.user.id })
      // localStorage.getItem('myValueInLocalStorage') || ''
    }
  }

  componentDidMount() {
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
    fetch(`http://localhost:3001/games`, configObj)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          gameId: json.id
        })
      })
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar />
          <SideBar />
          <div className="grid-container">
            <Switch>
              <Route exact path="/" />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" render={(props) => (
                <LogIn userCreateOrLogIn={this.userCreateOrLogIn} />
              )} />
              <Route exact path="/signup" render={(props) => (
                <SignUp userCreateOrLogIn={this.userCreateOrLogIn} />
              )} />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
      // <div className="grid-container">
      //   <div className="item5">
      //     <div className="playingCards">
      //       <ul className="table">
      //         <Card card={{suit: 'spade', color: 'black', value: '7'}} />
      //         {/* <Card /> */}
      //       </ul>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default App;
