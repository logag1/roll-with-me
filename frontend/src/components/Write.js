import { useState, navigate } from "react";
import { IsMobile } from "./mobile";
import { useLocation } from "react-router-dom";

const styles = {
  container: {
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
  input: {
    width: '500px',
    height: '40px',
    marginBottom: '20px',
    borderColor: 'lightgray',
    fontSize: '20px',
    outline: 'gray',
    borderRadius: '10px',
    fontFamily: 'omyu_pretty'
  },
  descript: {
    fontSize: '30px',
    fontFamily: 'NanumSquareNeo-Variable',
    padding: '70px 0px'
  },
  submitBtn: {
    fontSize: '25px',
    width: '500px',
    backgroundColor: 'green',
    color: 'white',
    padding: '15px 100px',
    borderRadius: '8px',
    border: '1.5px dashed white',
    boxShadow: 'green 0px 0px 0px 8px, white 0px 0px 0px 9px',
    fontFamily: 'NanumSquareNeo-Variable',
    marginTop: '30px'
  },
  check: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: '-250px'
  },
  descript: {
    fontSize: '30px',
    fontFamily: 'NanumSquareNeo-Variable',
    padding: '70px 0px'
  }
}

const mobileStyles = {
  container: {
    backgroundColor: 'white',
    margin: '20px auto 0',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '350px',
    height: '1100px',
    borderRadius: '40px',
  },
  input: {
    width: '350px',
    height: '60px',
    marginBottom: '20px',
    borderColor: 'lightgray',
    fontSize: '20px',
    outline: 'gray',
    borderRadius: '10px',
    fontFamily: 'omyu_pretty'
  },
  check: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: '-180px'
  },
  descript: {
    fontSize: '25px',
    fontFamily: 'NanumSquareNeo-Variable',
    padding: '70px 0px'
  },
  submitBtn: {
    fontSize: '25px',
    width: '350px',
    backgroundColor: 'green',
    color: 'white',
    padding: '15px 100px',
    borderRadius: '8px',
    border: '1.5px dashed white',
    boxShadow: 'green 0px 0px 0px 8px, white 0px 0px 0px 9px',
    fontFamily: 'NanumSquareNeo-Variable',
    marginTop: '30px'
  }
}

function Write() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const container = IsMobile() ? mobileStyles.container : styles.container;
  const input = IsMobile() ? mobileStyles.input : styles.input;
  const descript = IsMobile() ? mobileStyles.descript : styles.descript;
  const check = IsMobile() ? mobileStyles.check : styles.check;
  const submitBtn = IsMobile() ? mobileStyles.submitBtn : styles.submitBtn;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');
  const [isChecked, setChecked] = useState(false);

  const handleCheck = () => {
    console.log(nickname)
    setChecked((prevChecked) => !prevChecked); // 토글 기능을 위해 현재 상태를 반전시킵니다.
    setNickname((prevNickname) => (!isChecked ? 'Unknown' : prevNickname));
  }

  const handleClick = async () => {
    try {
      if (!isChecked && nickname == "Unknown") {
        return alert('닉네임을 입력해주세요');
      }
      const response = await fetch(`https://rollwithme.kro.kr/api/gift`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          title: title,
          content: content,
          nickname: nickname
        })
      });
      const data = await response.json();
      //setRes(data);
      alert(data.message);
      if (data.success) return window.location.href = '/';
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div style={container}>
      <span style={descript}>마음을 담은 편지를 써주세요</span>
      <span>제목(20글자 이내)</span>
      <input
        name="제목"
        value={title}
        placeholder="제목을 작성해주세요."
        onChange={(e) => setTitle(e.target.value)}
        style={input}
      />
      <span>내용</span>
      <textarea
        cols="50"
        rows="20"
        resize='none'
        placeholder="내용을 작성해주세요."
        onChange={(e) => setContent(e.target.value)}
        style={{ ...input, resize: 'none', height: '100px' }}
      ></textarea>
      {!isChecked && (
        <div>
          <input
            type="text"
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
            style={input}
          />
        </div>
      )}
      <p style={{ fontSize: '20px', fontFamily: 'omyu_pretty' }}>
        <label style={check}>
          <input type="checkbox" checked={isChecked} onChange={handleCheck} style={{ width: '20px', height: '20px' }} name="nb[]" />
          익명으로 보내기
        </label>
      </p>
      <button style={submitBtn} onClick={handleClick}>편지 보내기</button>
    </div>
  );
}

export default Write;