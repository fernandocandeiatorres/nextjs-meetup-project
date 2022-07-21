import { MongoClient } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return <MeetupDetail image="" title="" address="" description="" />;
}

export async function getStaticPaths() {
  // since SSG builds the pages in build time
  // you fetch and create all the possible dynamic pages
  // on build time, not when the user makes a request because
  // it wouldnt be on build time then

  const client = await MongoClient.connect(
    "mongodb+srv://fernandodev:03042003bB@cluster0.uixyadr.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  const paths = meetups.map((meetup) => {
    return {
      params: { meetupId: meetup._id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // fetch data for a single meetup

  const client = await MongoClient.connect(
    "mongodb+srv://fernandodev:03042003bB@cluster0.uixyadr.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetup = meetupsCollection.find({ _id: params.id });

  return {
    props: {
      meetup,
    },
  };
}

export default MeetupDetails;
