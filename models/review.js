import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  body: String,
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Review', ReviewSchema);