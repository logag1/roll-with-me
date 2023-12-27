import './Profile.css';
import { Mobile, PC } from './mobile';
import { useState } from 'react';

function Navbar() {

  const styles = {
    mobileNavbarContainer: {
      position: "fixed",
      top: "0",
      right: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
      backgroundColor: "#333",
      color: "#fff",
      width: "50px",
      height: '50px',
      color: 'white',
      backgroundColor: 'transparent'
    },
    toggleButton: {
      color: 'black',
      width: '50px',
      height: '50px',
      cursor: "pointer",
      fill: 'black',
      textAlign: 'center',
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: '20px'
    },
    menu: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "none"
    },
    menuOpen: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: "100%",
      right: "0",
      background: "rgb(252, 244, 233)",
      width: "100px"
    },
    "menu li": {
      margin: "5px 0"
    },
    link: {
      textDecoration: "none",
      color: "black",
      marginTop: '30px',
      marginBottom: '30px',
      fontSize: '20px',
      fontFamily: 'omyu_pretty'
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const title = 'Roll!';
  const hasToken = () => {
    return document.cookie.startsWith('bearer=');
  }

  const deleteToken = () => {
    if (hasToken()) {
      document.cookie = `bearer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      alert('성공적으로 로그아웃 했어요');
    } else {
      alert('로그인 되어있지 않아요');
    }
    window.location.href = '/';
  }

  return (
    <>
      <PC>
        <div className="navbar">
          <a href='/' className="title">{title}</a>

          {hasToken() ? (
            <>
              <a onClick={deleteToken}>로그아웃</a>
              <a href='/profile'>내 프로필</a>
              <a href='/setting'>설정</a>
              <a href='/'>메인</a>
              <a onClick={() => { alert('디스코드 imgagol') }}>개발자 연락처</a>
            </>
          ) : (
            <>
              <a href='/login'>로그인</a>
              <a href='/register'>회원가입</a>
              <a href='/'>메인</a>
              <a onClick={() => { alert('디스코드 imgagol') }}>개발자 연락처</a>
            </>
          )}

        </div>
      </PC>
      <Mobile>
        <div style={styles.mobileNavbarContainer}>
          <div style={styles.toggleButton} onClick={toggleMenu}>
            ☰
          </div>
          <ul style={isOpen ? styles.menuOpen : styles.menu}>
            {hasToken() ? (
              <>
                <a onClick={deleteToken} style={styles.link}>로그아웃</a>
                <a href='/profile' style={styles.link}>내 프로필</a>
                <a href='/setting' style={styles.link}>설정</a>
                <a href='/' style={styles.link}>메인</a>
              </>
            ) : (
              <>
                <a href='/login' style={styles.link}>로그인</a>
                <a href='/register' style={styles.link}>회원가입</a>
                <a href='/' style={styles.link}>메인</a>
              </>
            )}
          </ul>
        </div>
      </Mobile>
    </>
  )
}

export default Navbar;