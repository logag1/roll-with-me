import { Request, Response } from 'express';
import { Users } from '../mongo';
import { decodeToken, getRandomId } from '../utilities';

/**
 * @description 상대 롤링페이퍼에 달아주기
 */
async function gift(req: Request, res: Response) {
  /* userId 자기 유저아이디 아님@@ 롤페 조회할 사람꺼임 */
  if (!req.body.userId || !req.body.content || !req.body.nickname || !req.body.title) return res.status(400).json({ success: false, message: '요소들이 충족되지 않았어요' });

  if (req.body.title.length > 20) return res.status(400).json({ success: false, message: '제목은 20글자 이내여야해요' });
  if (req.body.nickname.length > 8) return res.status(400).json({ success: false, message: '닉네임을 8글자 이내로 작성해주세요' });
  const user = await Users.findOne({ userId: req.body.userId });
  if (!user) return res.status(404).json({ success: false, message: '존재하지 않는 유저에요' });

  user.papers.push({
    paperId: getRandomId(),
    author: 'Unknown', // 롤페 원 주인 말고 작성하는 사람 - 익명 선택 여부 넣을거임 (로그인 안하면 자동 익명)
    nickname: req.body.nickname,
    title: req.body.title,
    content: req.body.content
  });

  await user.save();

  return res.status(200).json({ success: true, message: '성공적으로 편지를 보냈어요' });
}

async function getPapers(req: Request, res: Response) {
  const userId = req.query.userId;

  const user = await Users.findOne({ userId: userId });
  if (!user) return res.status(200).json({ success: false, message: '존재하지 않는 아이디' });

  const authHeader = req.get('Cookie');
  //if (!authHeader) return res.status(401).json({ success: false, message: '로그인 해주세요' });

  const result: any = {
    nickname: user.nickname,
    userId: user.userId,
    perm: 1, // perm 0: 자기 롤페 (권한 있음) 1: 권한 없음
    papers: user.papers.map((paper) => ({
      title: paper.title,
      author: paper.nickname,
      paperId: paper.paperId,
      createdAt: (paper.createdAt).toISOString().split('T')[0]
    }))
  }

  // 자기 롤페라면 @@자기꺼 아니어도 리턴 해줌 로그인정보 만료오류 고침@@ - 미래의 나야 뭔 말인지 몰라도 된다
  if (authHeader) {
    console.log(authHeader)
    const decodeRes = decodeToken(authHeader);
    console.log(decodeRes);
    if (!decodeRes) return res.status(401).json({ success: false, message: '로그인 정보가 만료되었습니다 다시 로그인해주세요' });
    if (decodeRes.userId == userId) {
      result.perm = 0;
    }
  }

  return res.status(200).json({ success: true, result });
}

async function getDetail(req: Request, res: Response) {
  const { paperId } = req.query;

  const authHeader = req.get('Cookie');
  if (!authHeader) return res.status(401).json({ success: false, message: '편지 내용을 확인하려면 로그인 해주세요' });

  const decodeRes = decodeToken(authHeader.split(';')[0]);
  if (!decodeRes) return res.status(401).json({ success: false, message: '잘못된 사용자 인증정보' });

  //if (decodeRes.userId !== userId) return res.status(401).json({ success: false, message: '자기 롤링페이퍼의 내용만 볼 수 있어요' });

  const user = await Users.findOne({ userId: decodeRes.userId });
  if (!user) return res.status(400).json({ success: false, message: '존재하지 않는 롤링페이퍼' });

  const paper = user.papers.find((el) => el.paperId == paperId);
  if (paper) {
    return res.status(200).json({
      success: true,
      result: {
        author: paper.author,
        nickname: paper.nickname,
        title: paper.title,
        content: paper.content,
        createdAt: paper.createdAt.toISOString().split('T')[0]
      }
    });
  } else {
    return res.status(400).json({ success: false, message: '존재하지 않는 paperId' });
  }
}

export {
  gift,
  getPapers,
  getDetail
}