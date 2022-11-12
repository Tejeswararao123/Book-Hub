import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillInstagram} from 'react-icons/ai'
import {FaGoogle, FaYoutube} from 'react-icons/fa'
import {ImTwitter} from 'react-icons/im'
import Failure from '../Failure'
import Header from '../Header'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const Bookitem = props => {
  const {item} = props
  const {coverpic, rating, readstatus, authorname, id, title} = item

  return (
    <Link className="bookdetailslink" to={`/books/${id}`}>
      <li className="booklistitem">
        <img className="booklistitemimage" src={coverpic} alt={title} />
        <div className="booklistitemcontent">
          <h1 className="booktitleinbooks">{title}</h1>
          <p style={{margin: '6px', fontSize: '13px'}}>{authorname}</p>
          <div className="ratingcontainerinbooks">
            <p style={{margin: '6px', fontSize: '13px'}}>Avg Rating</p>
            <BsFillStarFill fill="gold" size={20} />
            <p style={{margin: '6px', fontSize: '13px'}}>{rating}</p>
          </div>
          <div className="statuscontainerinbooks">
            <p style={{margin: '6px', fontSize: '13px'}}>Status :</p>
            <p className="bookstatustextinbooks">{readstatus}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

const Getbookstatusoption = props => {
  const {item, onfilteringbookstatus, currentbookstatus} = props
  const {value, label} = item
  const activefilter = value === currentbookstatus ? 'activebookfilter' : ''
  const onclickingfilteroption = () => {
    onfilteringbookstatus(value)
  }

  return (
    <li>
      <button
        className={`filterbuttons ${activefilter}`}
        onClick={onclickingfilteroption}
        type="button"
      >
        {label}
      </button>
    </li>
  )
}

class Bookshelves extends Component {
  state = {
    apistatus: 'LOADING',
    bookstatus: 'ALL',
    booksdata: [],
    searchValue: '',
  }

  componentDidMount() {
    this.fetchallbooks()
  }

  fetchallbooks = async () => {
    const {searchValue, bookstatus} = this.state
    const jwttoken = Cookies.get('jwt_token')
    const response = await fetch(
      `https://apis.ccbp.in/book-hub/books?shelf=${bookstatus}&search=${searchValue}`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${jwttoken}`,
        },
      },
    )
    if (response.ok === true) {
      const body = await response.json()
      const updatedbooks = body.books.map(item => ({
        authorname: item.author_name,
        coverpic: item.cover_pic,
        title: item.title,
        id: item.id,
        readstatus: item.read_status,
        rating: item.rating,
      }))
      this.setState({apistatus: 'SUCCESS', booksdata: updatedbooks})
    } else {
      this.setState({apistatus: 'FAILURE'})
    }
  }

  changesearchbookstatus = value => {
    this.setState({bookstatus: value}, this.fetchallbooks)
  }

  updatesearchinput = event => {
    this.setState({searchValue: event.target.value}, this.fetchallbooks)
  }

  searchwithinput = () => {
    this.fetchallbooks()
  }

  renderloading = () => (
    <div testid="loader" className="loadercontainer">
      <Loader type="TailSpin" color="blue" height={35} width={30} />
    </div>
  )

  renderbooks = () => {
    const {apistatus, booksdata, searchValue} = this.state
    if (apistatus === 'FAILURE') {
      return (
        <Failure apiurl="https://apis.ccbp.in/book-hub/books?shelf=ALL&search=" />
      )
    }
    if (booksdata.length === 0) {
      return (
        <div className="noitemsfoundcontainer">
          <img
            className="noitemsfoundimage"
            src="https://res.cloudinary.com/dpyccbikx/image/upload/v1667563277/Asset_1_1didnotfindmatch_egbzlj.png"
            alt="no books"
          />
          <h1
            style={{fontSize: '20px'}}
            className="noitemstext"
          >{`Your search for ${searchValue} did not find any matches.`}</h1>
        </div>
      )
    }
    return (
      <ul className="bookslist">
        {booksdata.map(item => (
          <Bookitem key={item.id} item={item} />
        ))}
      </ul>
    )
  }

  render() {
    const {apistatus, bookstatus, searchinputvalue} = this.state

    const label = bookshelvesList.find(a => {
      if (a.value === bookstatus) {
        return true
      }
      return false
    })

    return (
      <div className="bookspage">
        <Header highlight="bookshelves" />

        <div className="bookshelvescontainer-container">
          <div className="bookshelvescontainer">
            <div className="searchinputcontainerforsmall">
              <input
                value={searchinputvalue}
                onChange={this.updatesearchinput}
                className="searchinput"
                type="search"
              />
              <button
                className="searchbutton"
                testid="searchButton"
                onClick={this.searchwithinput}
                type="button"
              >
                <BsSearch className="searchicon" fill="#435061" size={25} />
              </button>
            </div>
            <div className="filterscontainer">
              <h1 className="bookshelvestitle">Bookshelves</h1>
              <ul className="filterslist">
                {bookshelvesList.map(item => (
                  <Getbookstatusoption
                    item={item}
                    currentbookstatus={bookstatus}
                    onfilteringbookstatus={this.changesearchbookstatus}
                    key={item.id}
                  />
                ))}
              </ul>
            </div>
            <div className="bookssection">
              <div className="booksandsearchcontainer">
                <h1 className="currentcategorytitle">{`${label.label} Books`}</h1>
                <div className="searchinputcontainerforlarge">
                  <input
                    value={searchinputvalue}
                    onChange={this.updatesearchinput}
                    className="searchinput"
                    type="search"
                  />
                  <button
                    className="searchbutton"
                    testid="searchButton"
                    onClick={this.searchwithinput}
                    type="button"
                  >
                    <BsSearch className="searchicon" fill="#435061" size={27} />
                  </button>
                </div>
              </div>
              {apistatus === 'LOADING'
                ? this.renderloading()
                : this.renderbooks()}
              <div className="iconscontainer">
                <FaGoogle className="icon" fill="#3D3C3C" size={17} />
                <FaYoutube className="icon" fill="#3D3C3C" size={17} />
                <AiFillInstagram className="icon" fill="#3D3C3C" size={17} />
                <ImTwitter className="icon" fill="#3D3C3C" size={17} />
              </div>
              <p style={{textAlign: 'center', margin: '0px'}}>Contact us</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelves
