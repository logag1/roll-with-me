import crypto from 'crypto';

export function hash(pw: string) {
  const res = crypto.createHmac('sha256', process.env.HASHKEY!)
    .update(pw)
    .digest('hex');

  return res;
}