import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import Link from "next/link";

const db = getFirestore();

export async function getServerSideProps() {
  const q = query(collection(db, "movies"));
  const snap = await getDocs(q);
  const movies = snap.docs.map((doc) => doc.data());
  return { props: { movies } };
}

export default function Home({ movies }) {
  const apiKey = "eeaaf5bc";
  return (
    <div>
      <h1>Movies</h1>
      <div>
        Search Bar: <input type="text" />
      </div>
      {movies?.map((movie) => (
        <Link class="movie" href={"movie/" + movie.imdbID} key={movie.imdbID}>
          <h2>{movie.Title}</h2>
          <img src={movie.Poster} alt={movie.Title} />
        </Link>
      ))}
    </div>
  );
}
