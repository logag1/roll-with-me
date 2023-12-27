import { useState } from "react";
import { Mobile, PC } from "./mobile";

const styles = {
  input: {
    width: '400px',
    height: '60px',
    marginBottom: '20px',
    borderWidth: '0 0 3px',
    borderColor: 'lightgray',
    fontSize: '15px',
    fontWeight: 'bold',
    outline: 'none'
  },
  loginContainer: {
    backgroundColor: 'white',
    margin: '20px auto 0',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '700px',
    height: '800px',
    borderRadius: '40px',
  },
  title: {
    fontSize: '80px',
    margin: '70px 0px',
    fontFamily: 'omyu_pretty'
  },
  descript: {
    float: 'left'
  },
  loginBtn: {
    fontFamily: 'NanumSquareNeo-Variable',
    width: '400px',
    height: '50px',
    fontSize: '17px',
    backgroundColor: 'green',
    color: 'white',
    padding: '15px 100px',
    borderRadius: '8px',
    border: '1.5px dashed white',
    boxShadow: 'green 0px 0px 0px 8px, white 0px 0px 0px 9px',
    marginTop: '40px'
  }
}

const mobileStyle = {
  loginContainer: {
    backgroundColor: 'white',
    margin: '20px auto 0',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    height: '700px',
    borderRadius: '40px',
  },
  input: {
    width: '90%',
    height: '60px',
    marginBottom: '20px',
    borderWidth: '0 0 3px',
    borderColor: 'lightgray',
    fontSize: '15px',
    fontWeight: 'bold',
    outline: 'none'
  },
  loginBtn: {
    fontFamily: 'NanumSquareNeo-Variable',
    width: '350px',
    height: '50px',
    fontSize: '17px',
    backgroundColor: 'green',
    color: 'white',
    padding: '15px 100px',
    borderRadius: '8px',
    border: '1.5px dashed white',
    boxShadow: 'green 0px 0px 0px 8px, white 0px 0px 0px 9px',
    marginTop: '40px'
  }
}

function Register() {
  //const [res, setRes] = useState(null);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');

  const handleClick = async () => {
    try {
      const response = await fetch(`https://rollwithme.kro.kr/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          pw: pw,
          nickname: nickname
        })
      });
      const data = await response.json();
      //setRes(data);
      alert(data.message);
      if (data.success) window.location.href = '/login'
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <PC>
        <div style={styles.loginContainer}>
          <span style={styles.title}>회원가입</span>
          <input
            name="아이디"
            value={id}
            placeholder="아이디"
            onChange={(e) => setId(e.target.value)}
            style={styles.input}
          />
          <input
            name="비밀번호"
            value={pw}
            placeholder="비밀번호"
            onChange={(e) => setPw(e.target.value)}
            style={styles.input}
          />
          <input
            name="닉네임"
            value={nickname}
            placeholder="닉네임"
            onChange={(e) => setNickname(e.target.value)}
            style={styles.input}
          />
          <span style={styles.descript}>비밀번호 찾기는 지원하지 않습니다</span>
          <button style={styles.loginBtn} onClick={handleClick}>회원가입</button>
          <button style={styles.loginBtn} onClick={() => window.location.href = '/login'}>로그인 하러 가기</button>
        </div>
      </PC>
      <Mobile>
        <div style={mobileStyle.loginContainer}>
          <span style={styles.title}>회원가입</span>
          <input
            name="아이디"
            value={id}
            placeholder="아이디"
            onChange={(e) => setId(e.target.value)}
            style={mobileStyle.input}
          />
          <input
            name="비밀번호"
            value={pw}
            placeholder="비밀번호"
            onChange={(e) => setPw(e.target.value)}
            style={mobileStyle.input}
          />
          <input
            name="닉네임"
            value={nickname}
            placeholder="닉네임"
            onChange={(e) => setNickname(e.target.value)}
            style={mobileStyle.input}
          />
          <span style={styles.descript}>비밀번호 찾기는 지원하지 않습니다</span>
          <div style={styles.btnContainer}>
            <button style={mobileStyle.loginBtn} onClick={handleClick}>회원가입</button>
          </div>
        </div>
      </Mobile>
    </div>
  );
}

export default Register;