import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  
  // If visible == false don't show anything 
  if (!notification.visible) {
    return null
  };
  
  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
};

export default Notification;