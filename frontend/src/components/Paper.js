import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Mobile, PC, IsMobile } from "./mobile";

const styles = {
  container: {
    position: 'relative', // Set position to relative
    backgroundColor: '#E0B88A',
    borderRadius: '8px',
    border: '4px dashed #900020',
    boxShadow: '#E0B88A 0px 0px 0px 8px, white 0px 0px 0px 9px',
    maxWidth: '600px',
    minHeight: '1100px',
    margin: '20px auto 0',
    padding: '10px',
    display: 'flex'
  },
  top: {
    position: 'relative',
    width: '100%',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0936D ',
    zIndex: '2',
    fontSize: '50px',
    padding: '2px',
    fontFamily: 'GangwonEdu_OTFBoldA',
    whiteSpace: 'nowrap'
  },
  writeBtn: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    width: '60px',
    height: '60px',
    zIndex: '2',
    justifyContent: 'center',
    margin: '0px 0px 10px',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: '10px',
    zIndex: '2'
  },
  count: {
    fontFamily: 'NanumSquareNeo-Variable',
    marginTop: '10px',
    fontSize: '20px',
    padding: '10px 0px'
  },
  list: {
    right: '10px',
    alignItems: 'center',
    display: 'grid',
    gridGap: '15px',
    gridTemplateColumns: '1fr',
    width: '98%',
    padding: '5px',
  },
  item: {
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    minHeight: '100px',
    minWidth: '300px',
    marginTop: '20px',
    padding: '15px 20px',
    wordBreak: 'keep-all',
    boxShadow: '3px 3px 3px 0.5px rgb(210, 210, 210)',
    transition: '0.5s',
    border: '0.5px solid gray'
  },
  itemHover: {
    transform: 'scale(1.05)'
  },
  middle: {
    marginBottom: '1px'
  },
  title: {
    fontFamily: 'NanumSquareNeo-Variable',
    fontSize: '20px',
    color: 'rgb(0, 0, 0)',
    marginBottom: '40px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  topa: {
    alignItems: 'center',
    verticalAlign: 'middle',
    display: 'flex'
  },
  deco: {
    marginLeft: 'auto',
    marginBottom: '25px',
    padding: '3px 10px',
    backgroundColor: 'rgba(0, 0, 0, 0.283)',
    color: 'white',
    borderRadius: '10px',
    flexShrink: 0
  },
  bottom: {
    marginLeft: '0px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: '0',
    color: 'rgb(255, 255, 255)'
  },
  bottomSpan: {
    fontFamily: 'NanumSquareNeo-Variable',
    padding: '5px 10px',
    backgroundColor: 'rgba(54, 34, 61, 0.7)',
    borderRadius: '10px',
    marginRight: '5px'
  }
};

const mobileStyles = {
  top: {
    position: 'relative',
    width: '100%',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0936D ',
    zIndex: '2',
    fontSize: '40px',
    padding: '2px',
    fontFamily: 'GangwonEdu_OTFBoldA',
    whiteSpace: 'nowrap'
  },
  container: {
    position: 'relative', // Set position to relative
    backgroundColor: '#E0B88A',
    borderRadius: '8px',
    border: '4px dashed #900020',
    boxShadow: '#E0B88A 0px 0px 0px 8px, white 0px 0px 0px 9px',
    maxWidth: '87%',
    minHeight: '800px',
    margin: '20px auto 0',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  list: {
    alignItems: 'center',
    display: 'flex',
    gridGap: '15px',
    gridTemplateColumns: '1fr',
    width: '100%',
    padding: '5px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

function ShuffleElements({ originalElements }) {
  const list = IsMobile() ? mobileStyles.list : styles.list;
  return (
    <div style={list}>
      {[...originalElements.papers].reverse().map((element, index) => (
        <div onClick={() => { window.location.href = `/detail?paperId=${element.paperId}` }}>
          <div style={{ ...styles.item, ...styles.itemHover }}>
            <div style={styles.topa}>
              <div style={styles.title}>💌 {element.title.length > 8 ? element.title.substring(0, 8) + '...' : element.title}</div>
              <div style={styles.deco}>{element.createdAt}</div>
            </div>
            <div style={styles.bottom}>
              <span style={styles.bottomSpan}>from {element.author}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Paper() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const [info, setInfo] = useState(null);
  const container = IsMobile() ? mobileStyles.container : styles.container;
  const list = IsMobile() ? mobileStyles.list : styles.list;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://rollwithme.kro.kr/api/gift?userId=${userId}`);
        const data = await response.json();
        setInfo(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userId) {
      fetchData();
    } else {
      window.location.href = '/';
    }
  }, [userId]);

  return (
    <div>
      <div style={container}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px' }}>
          <PC>
            <span style={styles.top}>
              {info && info.success ? (
                <>
                  <span style={{ color: 'green' }}>
                    {info.result.nickname.length > 9
                      ? info.result.nickname.substring(0, 9) + '...'
                      : info.result.nickname
                    }
                  </span>님의 롤링페이퍼
                </>
              ) : (
                '정보가 없습니다'
              )}
            </span>
          </PC>
          <Mobile>
            <span style={mobileStyles.top}>
              {info && info.success ? (
                <>
                  <span style={{ color: 'green', display: 'block' }}>{info.result.nickname}</span>
                </>
              ) : (
                '정보가 없습니다'
              )}
            </span>
          </Mobile>
          <span style={styles.count}>{info && info.result ? `${info.result.papers.length}명이 마음을 전했어요` : ''}</span>
          <div>
            {info && info.result ? (
              <div>
                <h1>내 편지</h1>
                <div style={list}>
                  <ShuffleElements originalElements={info.result} />
                </div>
              </div>
            )
              : (<div>편지가 없습니다</div>)
            }
          </div>
        </div>
        <button style={styles.writeBtn} onClick={() => { window.location.href = `/write?userId=${userId}` }}>✏️</button>
      </div>
    </div>
  );
}

export default Paper;