import React from 'react';
import './App.css';
import SignUp from './Containers/SignUp'
import LogIn from './Containers/LogIn'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
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
        console.log(json.id)
        this.setState({
          gameId: json.id,
        })
      })
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
    e.target.username.value = ''
    e.target.password.value = ''
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
      let form = document.querySelector('.home-container form')
      response.error.forEach(error => {
        let message = document.createElement('p')
        message.textContent = error 
        message.classList.add('error-message')
        form.append(message)
      })
    } else {
      localStorage.setItem('Token', response.jwt)
      this.setState({ userId: response.user.id })
    }
  }



  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar userId={this.state.userId}/>
          <SideBar />
          <Switch>
            <div className="grid-container">
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" render={(props) => (this.state.userId === 0 ? (
                <LogIn userCreateOrLogIn={this.userCreateOrLogIn} />
              ) : <About/>
              )} />
              <Route exact path="/signup" render={(props) => (this.state.userId === 0 ? (
                <SignUp userCreateOrLogIn={this.userCreateOrLogIn} />
              ) : <About/>
              )} />
              <Route exact path="/game" render={(props) => (this.state.gameId === 0 || this.state.userId === 0 ? <LogIn userCreateOrLogIn={this.userCreateOrLogIn} /> : <Game gameId={this.state.gameId} userId={this.state.userId} />
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
