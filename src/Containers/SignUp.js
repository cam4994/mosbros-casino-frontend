import React from 'react';

const SignUp = (props) => {

    return (
      <div className="form">
          <h2 className="formTitle">Sign Up</h2>
          <form onSubmit={(e)=> {
              e.preventDefault()
              props.userCreateOrLogIn(e, "Sign Up")
            }}>
              <input placeholder="Username" name="username"/><br/>
              <input type="password" placeholder="Password" name="password"/><br/>
              <input type="submit" value="Sign Up"/>
          </form>
      </div>
    )
  }
  
  export default SignUp