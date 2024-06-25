import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

export async function getServerSideProps({ params }) {
  const docRef = doc(db, "movies", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      props: { movie: docSnap.data() },
    };
  }
}

export default function Yes({ movie }) {
  console.log("snap", movie);

  return (
    <div>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
    </div>
  );
}
