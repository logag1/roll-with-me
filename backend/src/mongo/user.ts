import { model, Schema } from 'mongoose';
import { Paper } from './paper';

export const Users = model(
  "users",
  new Schema({
    id: {
      type: String,
      required: true
    },
    pw: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    papers: [Paper]
  })
);