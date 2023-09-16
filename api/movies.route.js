import express from "express";
import MoviesController from "./movies.controller.js";
import ReviewsController from "./reviews.controller.js";
const router = express.Router(); // get access to express router
router.route("/").get(MoviesController.apiGetMovies);
router.route("/id/:id").get(MoviesController.apiGetMovieById)
router.route("/ratings").get(MoviesController.apiGetRatings)
router 
  .route("/review") // this is the endpoint for the review
  .post(ReviewsController.apiPostReview) // this is the method that will be called when a post request is made to the endpoint
  .put(ReviewsController.apiUpdateReview) // this is the method that will be called when a put request is made to the endpoint
  .delete(ReviewsController.apiDeleteReview); // this is the method that will be called when a delete request is made to the endpoint
export default router;
