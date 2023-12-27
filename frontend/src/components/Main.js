import { useState, useEffect, useRef } from "react";
import { Mobile, PC } from './mobile';
import logoImg from '../images/logo1.png';
//import adImg from '../images/ad.png';

const styles = {
  container: {
    maxWidth: '600px',
    minHeight: '750px',
    margin: '0 auto',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(rgb(245, 200, 184) 5%, rgb(252, 244, 233), rgb(252, 244, 233), rgb(252, 244, 233), rgb(252, 244, 233))'
  },
  title: {
    transition: '0.5s',
    fontSize: '40px',
    color: '#e46f01',
    margin: '0 auto',
    textAlign: 'center',
    fontWeight: '800',
    marginBottom: '20px',
    paddingTop: '30px'
  },
  start: {
    fontSize: '25px',
    width: '500px',
    backgroundColor: 'brown',
    color: 'white',
    padding: '15px 100px',
    borderRadius: '8px',
    border: '1.5px dashed white',
    boxShadow: 'brown 0px 0px 0px 8px, white 0px 0px 0px 9px',
    margin: '0px 0px 30px',
    fontFamily: 'NanumSquareNeo-Variable'
  },
  urlBtn: {
    fontSize: '25px',
    width: '500px',
    backgroundColor: 'green',
    color: 'white',
    padding: '15px 100px',
    borderRadius: '8px',
    border: '1.5px dashed white',
    boxShadow: 'green 0px 0px 0px 8px, white 0px 0px 0px 9px',
    fontFamily: 'NanumSquareNeo-Variable'
  },
  btnContainer: {
    marginTop: '100px',
    marginBottom: '100px',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  christMasDeco: {
    backgroundImage: 'linear-gradient(-45deg, green 25%, red 25%, red 50%, green 50%,  green 75%, red 75%, red 100%)',
    backgroundSize: '85px 85px',
    height: '20px',
    width: '100%'
  },
  logo: {
    paddingTop: '20px',
    width: '80%',
    height: '80%',
    borderRadius: '10%'
  },
  ad: {
    position: 'absolute',
    width: '100px',
    height: '400px',
    right: '0',
    paddingBottom: '300px'
  },
  intro: {
    fontFamily: 'NanumSquareNeo-Variable',
    fontSize: '20px',
    color: 'gray',
    margin: '-130px 0 40px 0'
  }
};

const mobileStyle = {
  urlBtn: {
    fontSize: '20px',
    width: '300px',
    backgroundColor: 'green',
    color: 'white',
    padding: '15px 50px',
    borderRadius: '8px',
    border: '1.5px dashed white',
    boxShadow: 'green 0px 0px 0px 8px, white 0px 0px 0px 9px',
    fontFamily: 'NanumSquareNeo-Variable'
  },
  start: {
    fontSize: '20px',
    width: '300px',
    backgroundColor: 'brown',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '8px',
    border: '1.5px dashed white',
    boxShadow: 'brown 0px 0px 0px 8px, white 0px 0px 0px 9px',
    margin: '0px 0px 30px',
    fontFamily: 'NanumSquareNeo-Variable'
  },
  intro: {
    fontFamily: 'NanumSquareNeo-Variable',
    fontSize: '15px',
    color: 'gray',
    margin: '-130px 0 40px 0'
  }
}

const hasToken = () => {
  return document.cookie.startsWith('bearer=');
}

function parseBearerCookie() {
  let cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith('bearer=')) {
      let cookieValue = cookie.substring('bearer='.length);
      try {
        const parts = cookieValue.split('.');

        if (parts.length === 3) { // 가운데 페이로드만 때옴
          const middlePart = parts[1];
          console.log(middlePart)
          const decodedValue = atob(middlePart);
          return {
            success: true,
            data: JSON.parse(decodedValue)
          };
        } else {
          console.log('Invalid JWT format');
          return {
            success: false
          };
        }
      } catch (error) {
        console.log('Error decoding Base64:', error);
        return {
          success: false
        };
      }
    }
  }
  return {
    success: false
  };
}

function Main() {
  const [url, setUrl] = useState();
  const cookie = 'bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlcDNsemUiLCJpYXQiOjE3MDMxMzU0NDMsImV4cCI6MTcwMzIyMTg0M30.WwhoDFWsUVAgyXnIYOs9TGONIETFrYTOFKzzMXCgrUc'
  const inputRef = useRef(null);

  useEffect(() => {
    let res = parseBearerCookie();
    if (res.success) {
      setUrl(`/paper?userId=${res.data.userId}`);
    } else {
      console.log('Cannot find token!!');
    }
  }, []);

  const copy = () => {
    if (inputRef.current) {
      inputRef.current.value = `https://rollwithme.kro.kr${url}`;
      inputRef.current.select();
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      alert('클립보드에 링크가 복사되었습니다!');
    }
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.christMasDeco} />
        <img src={logoImg} style={styles.logo} alt="" />
        <PC>
          <div style={styles.btnContainer}>
            {hasToken() ? (
              <>
                <button style={styles.start} onClick={() => { window.location.href = url }}>내 롤링페이퍼 보러가기</button>
                <button style={styles.urlBtn} onClick={copy}>내 페이퍼 공유하기</button>
              </>
            ) : (
              <>
                <span style={styles.intro}>회원가입하고 친구들과 롤링페이퍼를 나눠 보는거 어때요?</span>
                <button style={styles.urlBtn} onClick={() => { window.location.href = '/register' }}>가입/로그인 하러 가기</button>
              </>
            )}
          </div>
        </PC>
        <Mobile>
          <div style={styles.btnContainer}>
            {hasToken() ? (
              <>
                <button style={mobileStyle.start} onClick={() => { window.location.href = url }}>내 롤링페이퍼 보러가기</button>
                <button style={mobileStyle.urlBtn} onClick={copy}>내 페이퍼 공유하기</button>
              </>
            ) : (
              <>
                <span style={mobileStyle.intro}>회원가입하고 친구들과 롤링페이퍼를 나눠 보는거 어때요?</span>
                <button style={mobileStyle.urlBtn} onClick={() => { window.location.href = '/register' }}>가입/로그인 하러 가기</button>
              </>
            )}
          </div>
        </Mobile>
        <div style={styles.christMasDeco} />
        <input
          type="text"
          ref={inputRef}
          style={{ position: 'absolute', left: '-9999px' }}
          readOnly
        />
      </div>
    </div>
  );
}

export default Main;