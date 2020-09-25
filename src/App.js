import React from 'react';
import './App.css';
import SignUp from './SignUp'

class App extends React.Component {

  signUp = (e) => {
    e.preventDefault()
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
    fetch("http://localhost:3001/users", configObj)
      .then(resp=> resp.json())
      .then(user=> console.log(user))
  }

  render() {
    return (
      <div className="App">
        <SignUp signUp={this.signUp} />
      </div>
    );
  }
}

export default App;
