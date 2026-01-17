const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }
  console.log(message)
  console.log(className)
  return <div className={className}>{message}</div>
}

export default Notification