import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";

async function main() {
    dotenv.config() // loads environment variables

    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    )

    const port = process.env.PORT || 8000

    try {
        // connect to Mongo DB server
        await client.connect()

        app.listen(port, ()=>{
            console.log('server is running on port:'+port)
        })
    } catch(e) {
        console.log(e);
        process.exit(1);
    }

}

main().catch(console.error);