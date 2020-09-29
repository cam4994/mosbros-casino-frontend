import React from 'react';
import './App.css';
import './Styling/card.css'
import SignUp from './Containers/SignUp'
import LogIn from './Containers/LogIn'
import Card from './Components/Card'

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
      <div className="grid-container">
        <div className="item1">
          {/* <SignUp userCreateOrLogIn={this.userCreateOrLogIn} />
          <LogIn userCreateOrLogIn={this.userCreateOrLogIn} /> */}
        </div>
        <div className="item2">
          Put the dealer stuff here
        </div>
        <div className="item3">

        </div>
        <div className="item4">

        </div>
        <div className="item5">
          <div className="playingCards">
            <ul className="table">
              <Card card={{suit: 'spade', color: 'black', value: '7'}} />
              {/* <Card /> */}
            </ul>
          </div>
        </div>
        <div className="item5">

        </div>
      </div>
    );
  }
}

export default App;
