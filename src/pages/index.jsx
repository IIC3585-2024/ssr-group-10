import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { useState } from "react";
import Link from "next/link";

const db = getFirestore();

export async function getServerSideProps() {
  const q = query(collection(db, "movies"));
  const snap = await getDocs(q);
  const movies = snap.docs.map((doc) => doc.data());
  return { props: { movies } };
}

export default function Home({ movies }) {
  const [input, setInput] = useState("");

  return (
    <div>
      <h1>Movies</h1>
      <p>If your desired movie is missing, search for it</p>
      <div>
        Search Bar: <input type="text" onChange={(e) => setInput(e.target.value)} />
        <Link href={"search?value=" + input}>
          <button>Go</button>
        </Link>
      </div>
      <div className="catalog">
        {movies?.map((movie) => (
          <Link className="movie" href={"movie/" + movie.imdbID} key={movie.imdbID}>
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} />
          </Link>
        ))}
      </div>
    </div>
  );
}
