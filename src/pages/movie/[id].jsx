import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

export async function getServerSideProps({ params }) {
  const docRef = doc(db, "movies", params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return { props: { movie: { Title: "Not found" } } };
  }

  return {
    props: { movie: docSnap.data() },
  };
}

export default function Movie({ movie }) {
  return (
    <div>
      <h1>
        {movie.Title} ({movie.Year})
      </h1>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <p>
        <strong>Rated:</strong> {movie.Rated}
      </p>
      <p>
        <strong>Released:</strong> {movie.Released}
      </p>
      <p>
        <strong>Runtime:</strong> {movie.Runtime}
      </p>
      <p>
        <strong>Genre:</strong> {movie.Genre}
      </p>
      <p>
        <strong>Director:</strong> {movie.Director}
      </p>
      <p>
        <strong>Writer:</strong> {movie.Writer}
      </p>
      <p>
        <strong>Actors:</strong> {movie.Actors}
      </p>
      <p>
        <strong>Plot:</strong> {movie.Plot}
      </p>
      <p>
        <strong>Language:</strong> {movie.Language}
      </p>
      <p>
        <strong>Country:</strong> {movie.Country}
      </p>
      <p>
        <strong>Awards:</strong> {movie.Awards}
      </p>
      <div>
        <h3>Ratings</h3>
        <ul>
          {movie.Ratings?.map((rating, index) => (
            <li key={index}>
              <strong>{rating.Source}:</strong> {rating.Value}
            </li>
          ))}
        </ul>
      </div>
      <p>
        <strong>Metascore:</strong> {movie.Metascore}
      </p>
      <p>
        <strong>IMDb Rating:</strong> {movie.imdbRating}
      </p>
      <p>
        <strong>IMDb Votes:</strong> {movie.imdbVotes}
      </p>
      <p>
        <strong>Type:</strong> {movie.Type}
      </p>
      <p>
        <strong>DVD Release:</strong> {movie.DVD}
      </p>
      <p>
        <strong>Box Office:</strong> {movie.BoxOffice}
      </p>
      <p>
        <strong>Production:</strong> {movie.Production}
      </p>
      <p>
        <strong>Website:</strong> {movie.Website}
      </p>
    </div>
  );
}
