import React from "react";
import './FollowersList.css'
import { useDispatch, useSelector } from "react-redux";
import { getUserDataAPI, selectFollowers, selectUserData, setUsername } from "../../store/store";
import { useNavigate } from "react-router-dom";

function FollowersList() {
  const userData = useSelector(selectUserData);
  const followers = useSelector(selectFollowers);

  const dispatch = useDispatch();
  const Navigate = useNavigate("");

  const handleFollowerClick=(followerName)=>{
    dispatch(setUsername(followerName));
    dispatch(getUserDataAPI(followerName));
    Navigate("/repository-list");

  }
console.log(userData)
console.log(followers)
  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <>
    <h1>Followers of {userData.name}</h1>
    <div className="followers-list">
    {followers && followers.length > 0 ? (
      followers.map((follower) => (
        <div 
          key={follower.id} 
          className="follower-item"
          onClick={() => handleFollowerClick(follower.login)}
        >

<div className="follower-header">
                <img src={follower.avatar_url} alt={`${follower.avatar_url}'s avatar`} className="followers-avatar" />
              </div>
          <h3>{follower.login}</h3>
        </div>
      ))
    ) : (
      <div>No followers found.</div>
    )}
  </div>
  </>
  );
}

export default FollowersList;
