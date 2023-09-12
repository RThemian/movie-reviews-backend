import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let reviews;
export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("reviews");
    } catch (e) {
      console.error(`unable to establish connection handle in reviewDAO: ${e}`);
    }
  }
  static async addReview(movieId, user, review, date) {
        console.log("review",review)
    try {
        const reviewDoc = {
            name: user.name,
            user_id: user._id,
            date: date,
            review: review,
            movie_id: new ObjectId(movieId)
  }
    return await reviews.insertOne(reviewDoc)
    } catch (e) {
        console.error(`unable to post review: ${e}`);
        return { error: e };
        }
    }
    static async updateReview(reviewId, userId, review, date) {
        try {
            const updateResponse = await reviews.updateOne(
                {user_id: userId, _id: new ObjectId(reviewId)}, // 
                {$set: {review: review, date: date}} // $set is a mongodb operator that allows us to update a field
            )
        }
        catch (e) {
            console.error(`unable to update review: ${e}`)
            return {error: e}
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewId), // find review by id, ObjectId is a mongodb object which is why we need to import mongodb,
                user_id: userId,
            })
            return deleteResponse
            // what's the difference between mongodb and mongoose? mongodb is the database, mongoose is a library that allows us to interact with mongodb, mongoose is an object data modeling library
        }
        catch (e) {
            console.error(`unable to delete review: ${e}`)
            return {error: e}
        }
    }
}

