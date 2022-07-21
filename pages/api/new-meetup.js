// /api/new-meetup
// only POST requests

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const client = await MongoClient.connect(
      `mongodb+srv://${user}:${password}@cluster0.uixyadr.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    const db = client.db();

    // non relational database
    // collections -> tables
    // documents -> entries on the tables
    // single meetup would be one document on the collection
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    client.close();

    return res.status(201).json({ message: "Meetup added!" });
  }
}

export default handler;
