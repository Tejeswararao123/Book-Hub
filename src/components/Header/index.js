import './index.css'
import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu, GiCancel} from 'react-icons/gi'

class Header extends Component {
  state = {routelinksvisible: false}

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onclickingcancel = () => {
    this.setState(prev => ({routelinksvisible: !prev.routelinksvisible}))
  }

  render() {
    const {routelinksvisible} = this.state
    const {highlight} = this.props
    const homeclass = highlight === 'home' ? 'bluetext' : ''
    const bookshelvesclass = highlight === 'bookshelves' ? 'bluetext' : ''
    return (
      <div className="headercontainer">
        <div className="header">
          <nav className="navcontainer">
            <Link to="/">
              <img
                className="logoinheader"
                src="https://res.cloudinary.com/dpyccbikx/image/upload/v1667563272/Group_7731logo_xilk0x.png"
                alt="website logo"
              />
            </Link>
            <ul className="routelinkscontainerforlarge">
              <Link className={`routelink ${homeclass}`} to="/">
                <li>Home</li>
              </Link>
              <Link className={`routelink ${bookshelvesclass} `} to="/shelf">
                <li>Bookshelves</li>
              </Link>
              <button
                onClick={this.logout}
                className="logoutbutton"
                type="button"
              >
                Logout
              </button>
            </ul>

            <GiHamburgerMenu
              onClick={this.onclickingcancel}
              className="hamburger"
              color="black"
            />
          </nav>
        </div>

        {routelinksvisible && (
          <div style={{paddingTop: 'px', backgroundColor: '#d7dcf0'}}>
            <ul className="routelinkscontainerforsmall">
              <Link className={`routelink ${homeclass}`} to="/">
                <li>Home</li>
              </Link>
              <Link className={`routelink ${bookshelvesclass} `} to="/shelf">
                <li>Bookshelves</li>
              </Link>
              <button
                onClick={this.logout}
                className="logoutbutton"
                type="button"
              >
                Logout
              </button>
              <GiCancel
                onClick={this.onclickingcancel}
                className="cancelicon"
                size={20}
              />
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default withRouter(Header)
