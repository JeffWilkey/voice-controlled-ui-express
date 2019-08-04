import express from 'express';
import Review from '../models/review';
const reviewRouter = express.Router();

reviewRouter.get('/', (req, res, next) => {
  Review.find({}, (err, reviews) => {
    if (err) res.send(err);
    res.status(200).json(reviews)
  });
});

reviewRouter.post('/', (req, res, next) => {
  let newReview = new Review(req.body);
  newReview.save((err, review) => {
    if (err) res.send(err);
    res.status(201).json(review);
  });
});

reviewRouter.delete('/:reviewId', (req, res, next) => {
  Review.remove({ _id: req.params.contactId }, (err) => {
    if (err) res.send(err);
    res.sendStatus(204);
  });
});

module.exports = reviewRouter;