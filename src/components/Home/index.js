import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {FaGoogle, FaYoutube} from 'react-icons/fa'
import {ImTwitter} from 'react-icons/im'
import {AiFillInstagram} from 'react-icons/ai'
import Header from '../Header'
import Failure from '../Failure'

const TopratedProduct = props => {
  const {item} = props
  const {coverpic, authorname, title, id} = item

  return (
    <Link className="topratedlinks" to={`/books/${id}`}>
      <div className="carouselitem">
        <img className="carouselimage" src={coverpic} alt={title} />
        <h1 className="bookdetails">{title}</h1>
        <h1 className="authortext">{authorname}</h1>
      </div>
    </Link>
  )
}

class Home extends Component {
  state = {apistatus: 'LOADING', topratedbooks: []}

  componentDidMount() {
    this.fetchtopratedbooks()
  }

  fetchtopratedbooks = async () => {
    const jwttoken = Cookies.get('jwt_token')

    const response = await fetch(
      'https://apis.ccbp.in/book-hub/top-rated-books',
      {method: 'GET', headers: {authorization: `Bearer ${jwttoken}`}},
    )
    if (response.ok === true) {
      const body = await response.json()
      console.log(body)
      const updateddata = body.books.map(item => ({
        coverpic: item.cover_pic,
        authorname: item.author_name,
        id: item.id,
        title: item.title,
      }))
      console.log(updateddata)
      this.setState({topratedbooks: updateddata, apistatus: 'SUCCESS'})
    } else {
      this.setState({apistatus: 'FAILURE'})
    }
  }

  renderloading = () => (
    <div testid="loader" className="loadercontainer">
      <Loader type="TailSpin" height={50} width={50} />
    </div>
  )

  onclickingfindbooks = () => {
    const {history} = this.props
    history.replace('/bookshelves')
  }

  rendertopratedbooks = () => {
    const {apistatus, topratedbooks} = this.state

    if (apistatus === 'FAILURE') {
      return <Failure apiurl="https://apis.ccbp.in/book-hub/top-rated-books" />
    }

    const settingsforlarge = {
      slidesToShow: 4,
      slidesToScroll: 1,
      speed: 500,
      infinite: false,
    }
    const settingsforsmall = {
      slidesToShow: 2,
      slidesToScroll: 1,
      speed: 500,
      infinite: false,
    }
    const settingsformedium = {
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 500,
      infinite: false,
    }
    return (
      <>
        <div className="sliderforlarge">
          <Slider {...settingsforlarge}>
            {topratedbooks.map(item => (
              <TopratedProduct item={item} key={item.id} />
            ))}
          </Slider>
        </div>
        <div className="sliderformedium">
          <Slider {...settingsformedium}>
            {topratedbooks.map(item => (
              <TopratedProduct item={item} key={item.id} />
            ))}
          </Slider>
        </div>
        <div className="sliderforsmall">
          <Slider {...settingsforsmall}>
            {topratedbooks.map(item => (
              <TopratedProduct item={item} key={item.id} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  render() {
    const {apistatus} = this.state

    return (
      <div className="homepagecontainer">
        <Header highlight="home" />
        <div className="homepageexceptheader">
          <div className="homepagecontentcontainer">
            <h1 className="homepagetitles">Find Your Next Favorite Books?</h1>
            <p>
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link className="findbookslink" to="/shelf">
              <button
                className="findbooksbuttonforsmall"
                onClick={this.onclickingfindbooks}
                type="button"
              >
                Find Books
              </button>
            </Link>
            <div className="topratedbookscontainer">
              <div className="topratedbookstitlecontainer">
                <h1 className="homepagetitles">Top Rated Books</h1>
                <Link to="/shelf">
                  <button
                    className="findbooksbuttonforlarge"
                    onClick={this.onclickingfindbooks}
                    type="button"
                  >
                    Find Books
                  </button>
                </Link>
              </div>
              {apistatus === 'LOADING'
                ? this.renderloading()
                : this.rendertopratedbooks()}
            </div>
          </div>
          <div className="footersection">
            <div className="iconscontainer">
              <FaGoogle className="icon" fill="#3D3C3C" size={17} />
              <FaYoutube className="icon" fill="#3D3C3C" size={17} />
              <AiFillInstagram className="icon" fill="#3D3C3C" size={17} />
              <ImTwitter className="icon" fill="#3D3C3C" size={17} />
            </div>
            <p className="contactustext">Contact us</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
