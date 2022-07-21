import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    try {
      const response = await fetch("http://localhost:3000/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(enteredMeetupData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log(data);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetupPage;
