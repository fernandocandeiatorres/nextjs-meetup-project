import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetupDetail
        image={props.image}
        title={props.title}
        address={props.address}
        description={props.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  // since SSG builds the pages in build time
  // you fetch and create all the possible dynamic pages
  // on build time, not when the user makes a request because
  // it wouldnt be on build time then
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const client = await MongoClient.connect(
    `mongodb+srv://${user}:${password}@cluster0.uixyadr.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  const paths = meetups.map((meetup) => {
    return {
      params: { meetupId: meetup._id.toString() },
    };
  });

  client.close();

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  // fetch data for a single meetup

  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const client = await MongoClient.connect(
    `mongodb+srv://${user}:${password}@cluster0.uixyadr.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetup = await meetupsCollection.findOne({
    _id: ObjectId(params.meetupId),
  });

  client.close();

  return {
    props: {
      id: meetup._id.toString(),
      title: meetup.title,
      address: meetup.address,
      image: meetup.image,
      description: meetup.description,
    },
  };
}

export default MeetupDetails;
