const FailureView = ({onRetry}) => (
    <div>
      <img src="failure-view.png" alt="failure view" />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={onRetry}>
        Try Again
      </button>
    </div>
  )
  
  export default FailureView
  