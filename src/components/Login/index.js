import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {errormessage: '', username: '', password: ''}

  onupdatingusername = event => {
    this.setState({username: event.target.value})
  }

  onupdatingpassword = event => {
    this.setState({password: event.target.value})
  }

  onsubmit = async event => {
    event.preventDefault()
    const {history} = this.props
    const {username, password} = this.state
    const userdetails = {username, password}

    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(userdetails),
    })
    const body = await response.json()
    if (response.ok === true) {
      const jwttoken = body.jwt_token
      Cookies.set('jwt_token', jwttoken, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errormessage: body.error_msg})
    }
  }

  render() {
    const jwttoken = Cookies.get('jwt_token')
    if (jwttoken !== undefined) {
      return <Redirect to="/" />
    }
    const {errormessage, username, password} = this.state

    return (
      <div className="loginpage">
        <img
          className="loginpageimage"
          src="https://res.cloudinary.com/dpyccbikx/image/upload/v1667563271/Rectangle_1467_tz6f4y.png"
          alt="website login"
        />
        <div className="rightsection">
          <form className="form" onSubmit={this.onsubmit}>
            <img
              className="bookhublogo"
              src="https://res.cloudinary.com/dpyccbikx/image/upload/v1667563272/Group_7731logo_xilk0x.png"
              alt="login website logo"
            />
            <label className="label" htmlFor="username">
              Username*
            </label>
            <input
              className="input"
              onChange={this.onupdatingusername}
              type="text"
              id="username"
              value={username}
              placeholder="Enter username"
            />
            <label className="label" htmlFor="password">
              Password*
            </label>
            <input
              className="input"
              onChange={this.onupdatingpassword}
              id="password"
              value={password}
              type="password"
              placeholder="Enter password"
            />
            {errormessage !== '' && (
              <p className="errormessage">{errormessage}</p>
            )}

            <button className="loginbutton" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
