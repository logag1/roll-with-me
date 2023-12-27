import { Request, Response } from 'express';
import { Users } from '../mongo';
import { getRandomId, hash, createToken } from '../utilities';

async function register(req: Request, res: Response) {
  if (!req.body.id || !req.body.pw || !req.body.nickname) return res.status(400).json({ success: false, message: '잘못된 요청이에요' });
  if (req.body.nickname > 10) return res.status(400).json({ success: false, message: '닉네임은 10글자 이내여야해요' });

  const user = await Users.findOne({ id: req.body.id });
  if (user) return res.status(200).json({ success: false, message: '이미 존재하는 아이디' });

  const randomUserId = getRandomId();

  await Users.create({
    id: req.body.id,
    pw: hash(req.body.pw),
    userId: randomUserId,
    nickname: req.body.nickname
  });

  return res.status(200).json({ success: true, message: '회원가입을 성공했어요' });
}

async function login(req: Request, res: Response) {
  if (!req.body.id || !req.body.pw) return res.status(400).json({ success: false, message: '잘못된 요청이에요' });
  const user = await Users.findOne({ id: req.body.id });

  if (!user) return res.status(400).json({ success: false, message: '존재하지 않는 아이디' });

  if (hash(req.body.pw) !== user.pw) return res.status(400).json({ success: false, message: '잘못된 비밀번호' });

  res.cookie('bearer', createToken({ userId: user.userId }));
  res.status(200).json({ success: true, message: '로그인을 성공했어요' });
}

export {
  register,
  login
}