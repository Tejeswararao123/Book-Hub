import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
import {FaGoogle, FaYoutube} from 'react-icons/fa'
import {ImTwitter} from 'react-icons/im'
import {AiFillInstagram} from 'react-icons/ai'
import {BsFillStarFill} from 'react-icons/bs'
import {BiLeftArrowAlt} from 'react-icons/bi'
import Header from '../Header'
import Failure from '../Failure'

class BookDetailsPage extends Component {
  state = {apistatus: 'LOADING', data: []}

  componentDidMount() {
    this.fetchbookdetails()
  }

  fetchbookdetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwttoken = Cookies.get('jwt_token')
    const response = await fetch(`https://apis.ccbp.in/book-hub/books/${id}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwttoken}`,
      },
    })
    if (response.ok) {
      const body = await response.json()
      const updateddata = {
        authorname: body.book_details.author_name,
        aboutauthor: body.book_details.about_author,
        aboutbook: body.book_details.about_book,
        coverpic: body.book_details.cover_pic,
        id: body.book_details.id,
        title: body.book_details.title,
        rating: body.book_details.rating,
        readstatus: body.book_details.read_status,
      }
      this.setState({data: updateddata, apistatus: 'SUCCESS'})
    } else {
      this.setState({apistatus: 'FAILURE'})
    }
  }

  renderloading = () => (
    <div testid="loader" className="loader">
      <Loader type="TailSpin" height={40} width={50} />
    </div>
  )

  onclickingbackicon = () => {
    const {history} = this.props
    history.replace('/shelf')
  }

  renderbookdetails = () => {
    const {data, apistatus} = this.state

    if (apistatus === 'SUCCESS') {
      const {
        coverpic,
        aboutauthor,
        aboutbook,
        authorname,
        title,
        rating,
        readstatus,
      } = data
      return (
        <div className="bookdetailscardcontainer">
          <div className="bookdetailscard">
            <BiLeftArrowAlt
              style={{cursor: 'pointer'}}
              onClick={this.onclickingbackicon}
              size={30}
              color="black"
            />
            <div className="bookdetailsimagecard">
              <img className="bookimage" src={coverpic} alt={title} />
              <div className="booklistitemcontent">
                <h1 className="booktitle">{title}</h1>
                <p className="authorname" style={{margin: '6px'}}>
                  {authorname}
                </p>
                <div className="ratingcontainer">
                  <p style={{margin: '6px'}}>Avg Rating</p>
                  <BsFillStarFill fill="gold" size={20} />
                  <p style={{margin: '6px'}}>{rating}</p>
                </div>
                <div className="statuscontainer">
                  <p className="marginfive" style={{margin: '6px'}}>
                    Status:
                  </p>
                  <p className="bookstatustext" style={{margin: '6px'}}>
                    {readstatus}
                  </p>
                </div>
              </div>
            </div>
            <hr className="hr" />
            <h1 className="aboutheading">About Author</h1>
            <p className="aboutcontent">{aboutauthor}</p>
            <h1 className="aboutheading">About Book</h1>
            <p className="aboutcontent">{aboutbook}</p>
          </div>
        </div>
      )
    }
    const {match} = this.props
    const {params} = match
    const {id} = params

    return <Failure apiurl={`https://apis.ccbp.in/book-hub/books/${id}`} />
  }

  render() {
    const {apistatus} = this.state

    return (
      <div className="bookdetailspage">
        <Header highlight="" />
        <div>
          {apistatus === 'LOADING'
            ? this.renderloading()
            : this.renderbookdetails()}

          <div>
            <div className="iconscontainer">
              <FaGoogle className="icon" fill="#3D3C3C" size={16} />
              <FaYoutube className="icon" fill="#3D3C3C" size={16} />
              <AiFillInstagram className="icon" fill="#3D3C3C" size={16} />
              <ImTwitter className="icon" fill="#3D3C3C" size={16} />
            </div>
            <p style={{textAlign: 'center', margin: '10px'}}>Contact us</p>
          </div>
        </div>
      </div>
    )
  }
}

export default BookDetailsPage
