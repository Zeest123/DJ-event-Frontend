import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
// import EventMap from "@/components/EventMap";s
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";

export default function EventPage({ evt }) {
  const router = useRouter();

  const { attributes, id } = evt || "";
  const { image, name, date, time, performers, description, venue, address } =
    attributes || "";

  console.log("image:", evt.image);
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(date).toLocaleDateString("en-US")} at {time}
        </span>
        <h1>{name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image} alt={name} width={960} height={600} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        {/* <EventMap evt={evt} /> */}

        <Link href="/events" className={styles.back}>
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
}
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}
// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// }
