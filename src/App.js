import React from 'react';
import './App.css';
import SignUp from './Containers/SignUp'
import LogIn from './Containers/LogIn'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './Components/NavBar';
import About from './Components/About';
import Home from './Components/Home';
import SideBar from './Components/SideBar';
import Game from './Containers/Game';

class App extends React.Component {
  state = {
    userId: 0,
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
        game_id: this.state.gameId
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
      console.log(response)
      localStorage.setItem('Token', response.jwt)
      this.setState({ userId: response.user.id })
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
          gameId: json.id,
        })
      })
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar />
          <SideBar />
          <Switch>
            <div className="grid-container">
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" render={(props) => (
                <LogIn userCreateOrLogIn={this.userCreateOrLogIn} />
              )} />
              <Route exact path="/signup" render={(props) => (
                <SignUp userCreateOrLogIn={this.userCreateOrLogIn} />
              )} />
              <Route exact path="/game" render={(props) => (this.state.gameId == 0 ? <LogIn userCreateOrLogIn={this.userCreateOrLogIn} /> : <Game gameId={this.state.gameId} userId={this.state.userId} />
              )} />
            </div>
          </Switch>
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
