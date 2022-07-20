import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://i.pinimg.com/originals/ce/2b/32/ce2b323c5cd34d1662eddbf1bb4ee48d.jpg",
    address: "Midtown Manhattan, NYC",
    description: "This is the first meetup at NYC!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://i.pinimg.com/originals/ce/2b/32/ce2b323c5cd34d1662eddbf1bb4ee48d.jpg",
    address: "Midtown Manhattan, NYC",
    description: "This is the second meetup at NYC!",
  },
];

function HomePage() {
  return <MeetupList meetups={DUMMY_MEETUPS} />;
}

export default HomePage;
