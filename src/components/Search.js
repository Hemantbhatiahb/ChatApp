import React from "react";

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="find chat" />
      </div>
      <div className="userChat">
        <img src="https://images.pexels.com/photos/16356463/pexels-photo-16356463/free-photo-of-blonde-woman-in-green-skirt-walking-along-pier.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <div className="userChatInfo">
          <span>Hemant</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
