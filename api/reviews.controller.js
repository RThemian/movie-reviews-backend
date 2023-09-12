import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = req.body.movie_id // get movie id from request body from mongoDB
            const review = req.body.review // get review from request body from mongoDB
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id // get user id from request body from mongoDB
            }
            const date = new Date() // get current date
            const ReviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            )
            res.json({status: 'success'}) // send success status from mongoDB (backend) to client (frontend)
        } catch (e) {
            res.status(500).json({error: e.message}) // send error status from mongoDB  to client
        }
        }
        static async apiDeleteReview(req, res, next) {
            try {
                const reviewId = req.body.review_id // get review id from request body from mongoDB to delete
                const userId = req.body.user_id // get user id from request body from mongoDB to delete
                const ReviewResponse = await ReviewsDAO.deleteReview(
                    reviewId,
                    userId
                )
                res.json({status: "success"}) // send success status from mongoDB (backend) to client (frontend)
            } catch (e) {
                res.status(500).json({error: e.message}) // send error status from mongoDB  to client
            }
        }



        static async apiUpdateReview(req, res, next) {
            try {
                const reviewId = req.body.review_id // get review id from request body from mongoDB to update
                const review = req.body.review // get review from request body from mongoDB to update
                const date = new Date() // get current date

                const ReviewResponse = await ReviewsDAO.updateReview(
                    reviewId,
                    req.body.user_id,
                    review,
                    date
                )
                var {error} = ReviewResponse // get error from mongoDB from backend ReviewsDAO
                if (error) {
                    res.status(400).json({error})
            }
            if (ReviewResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update review - user may not be original poster"
                )}
                res.json({status: 'success'}) // send success status from mongoDB (backend) to client (frontend)
            } catch(e) {
                res.status(500).json({error: e.message}) // send error status from mongoDB  to client
            }
            }
        }
    