import React from 'react'

const Chats = () => {
  return (
    <div className='chats'>
        <div className="userChat">
        <img src="https://images.pexels.com/photos/18022547/pexels-photo-18022547/free-photo-of-man-in-shawl-and-with-tattoos.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" />
        <div className="userChatInfo">
          <span>Hemant</span>
          <p>Hello</p>
        </div>
      </div>
        <div className="userChat">
        <img src="https://images.pexels.com/photos/7265302/pexels-photo-7265302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <div className="userChatInfo">
          <span>Sparsh</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats