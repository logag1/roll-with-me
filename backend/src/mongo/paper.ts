import { model, Schema } from 'mongoose';

export const Paper = new Schema({
  paperId: {
    type: String,
    required: true
  },
  author: { /* author userId */
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});