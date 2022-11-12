import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="pagenotfoundcontainer">
    <img
      className="pagenotfoundimage"
      src="https://res.cloudinary.com/dpyccbikx/image/upload/v1667563278/Group_7484pagenotfound_fyisad.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p
      style={{
        width: '70%',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="notfoundbutton" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)
export default NotFound
