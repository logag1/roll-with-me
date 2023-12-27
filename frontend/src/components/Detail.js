import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IsMobile } from "./mobile";

const styles = {
  container: {
    backgroundColor: 'white',
    margin: '20px auto 0',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '700px',
    height: '800px',
    borderRadius: '40px',
    whiteSpace: 'normal'
  },
  title: {
    fontFamily: 'GangwonEdu_OTFBoldA',
    fontSize: '50px',
    position: 'relative',
    marginTop: '50px'
  },
  content: {
    fontFamily: 'NanumSquareNeo-Variable',
    position: 'relative',
    marginTop: '50px',
    fontSize: '25px',
    lineHeight: '200%'
  },
  from: {
    fontWeight: 'bold',
    fontSize: '25px',
    marginTop: '30px'
  },
  goback: {
    height: '90px',
    width: '90px',
    fontSize: '50px',
    cursor: 'pointer',
    padding: '10px',
    justifyContent: 'center',
    marginRight: 'auto',
    backgroundColor: 'transparent',
    border: 'none'
  }
}

const mobileStyles = {
  container: {
    backgroundColor: 'white',
    margin: '20px auto 0',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '350px',
    height: '700px',
    borderRadius: '40px',
    whiteSpace: 'normal'
  }
}

function Detail() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paperId = searchParams.get("paperId");
  const [res, setRes] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://rollwithme.kro.kr/api/detail?paperId=${paperId}`);
      const data = await response.json();
      setRes(data);
      console.log(data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect를 사용하여 컴포넌트가 처음 마운트될 때 한 번 데이터를 가져오도록 합니다.
  useEffect(() => {
    fetchData();
  }, [paperId]); // paperId가 변경될 때마다 useEffect가 호출되도록 설정

  const container = IsMobile() ? mobileStyles.container : styles.container;

  return (
    <div>
      <div style={container}>
        {res && res.success ? (
          <>
            <button style={styles.goback} onClick={() => { navigate(-1) }}>🔙</button>
            <span style={styles.title}>{res.result.title}</span>
            <span style={styles.content}>{res.result.content}</span>
            <span style={styles.from}>From {res.result.nickname}</span>
          </>
        ) : (
          <>
            <span style={{ fontFamily: 'omyu_pretty', fontSize: '30px', textAlign: 'center' }}>편지 내용은 본인만 확인할 수 있어요</span>
            <span style={{ fontFamily: 'omyu_pretty', fontSize: '30px', textAlign: 'center' }}>본인이라면 로그인 해보세요!</span>
          </>
        )}
      </div>
    </div>
  );
}

export default Detail;
