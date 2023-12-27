import { useState } from 'react';
import { Mobile, PC } from './mobile';
import './Profile.css';
import profileImg from '../images/profile.jpg';
import profileBanner from '../images/background.png';

function Profile() {
  const [canClick, setClicked] = useState(true);
  const [follower, setFollower] = useState(1);

  function handleClick() {
    setClicked(false);
    setFollower(follower + 1);
  }

  return (
    <div className="container">
      <Mobile>
        <div>
          <p>모바일에선 아직 지원하지 않아요</p>
        </div>
      </Mobile>
      <PC>
        <img src={profileBanner} alt="" className="profile-banner" />
        <div className="content">
          <div className="profile-box">
            <img src={profileImg} alt="" className="profile-img" />
            <span className="nickname">김개떡</span>
            <div className="btn-container">
              <button className="follow-btn" onClick={handleClick} disabled={!canClick}>+</button>
            </div>
            <div className="follower-box">
              <div className="follower">팔로워</div>
              <div className="follower-count">{follower}</div>
            </div>
          </div>
          <p className="description">개떡 먹는 남자</p>
          <hr />
          <p className="status-msg">아 코딩하기 싫다</p>
          <p className="status-msg">아 코딩하기 싫다</p>
          <p className="status-msg">아 코딩하기 싫다</p>
        </div>
      </PC>
    </div>
  );
}

export default Profile;