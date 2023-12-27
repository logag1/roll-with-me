import jwt, { JwtPayload } from 'jsonwebtoken';

export function createToken(data: object) {
  return jwt.sign(data, process.env.JWTKEY!, { expiresIn: '1d' });
}

export function decodeToken(token: string): null | JwtPayload {
  try {
    const res = jwt.verify(token.split('bearer=')[1], process.env.JWTKEY!);
    if (res) return res as JwtPayload;
    return null;
  } catch {
    return null;
  }
}