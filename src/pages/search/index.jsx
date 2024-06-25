import { getFirestore, doc, setDoc } from "firebase/firestore";
import Link from "next/link";

const db = getFirestore();

export async function getServerSideProps({ query }) {
  const apiKey = "eeaaf5bc";
  const req = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${query?.value}`);
  const data = await req.json();

  if (data.Response == "False") {
    return { props: { movie: { Title: "Not found" } } };
  }

  const movieRef = doc(db, "movies", data.imdbID);
  await setDoc(movieRef, data);

  return { props: { movie: data } };
}

export default function Search({ movie }) {
  console.log("movie", movie);
  return (
    <Link href={"/movie/" + movie.imdbID}>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
    </Link>
  );
}
