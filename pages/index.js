import Layout from "@/components/Layout";

import { API_URL } from "../config";
import EventItem from "@/components/EventItem";

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  console.log("ressss", res);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1, //if the data has change then it will update it after 1 sec
  };
}
