import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // functions runs first than the page component
  // function that runs during build. ( static generation )

  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const client = await MongoClient.connect(
    `mongodb+srv://${user}:${password}@cluster0.uixyadr.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    revalidate: 1,
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
}

export default HomePage;

// export async function getServerSideProps(context) {
//   // regenerates the page after every request
//   // on the server side, not on the build like staticProps
//   // should use if you need to work with the context.req or context.res
//   // for authentication for example, or if your data changes A LOT
//   // Otherwise, you should use getStaticProps, because it can cache the
//   // Pre-generated page and reutilize it. While on getServerSideProps,
//   // it will generate a new page and fetch again everytime, which is slower.
// }
