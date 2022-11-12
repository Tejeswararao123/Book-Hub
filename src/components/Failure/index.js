import './index.css'

const Failure = props => {
  const {apiurl} = props

  const onclickingtryagain = async () => {
    const response = await fetch(apiurl, {method: 'GET'})
    console.log(response)
  }

  return (
    <div className="failurecontainer">
      <img
        className="failureimage"
        src="https://res.cloudinary.com/dpyccbikx/image/upload/v1667563277/Group_7522somethingwentwrong_obzzbe.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button
        onClick={onclickingtryagain}
        className="failurebutton"
        type="button"
      >
        Try again
      </button>
    </div>
  )
}
export default Failure
