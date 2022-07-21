// /api/new-meetup
// only POST requests

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://fernandodev:03042003bB@cluster0.uixyadr.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    // non relational database
    // collections -> tables
    // documents -> entries on the tables
    // single meetup would be one document on the collection
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    return res.status(201).json({ message: "Meetup added!" });
  }
}

export default handler;
