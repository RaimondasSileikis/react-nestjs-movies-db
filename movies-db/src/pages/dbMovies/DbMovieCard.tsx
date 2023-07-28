import { 
  useLoaderData, 
  useLocation, 
  Link, 
  Params
} from "react-router-dom";
import { getDbMovieById, DB_API_IMG } from "../../api";
import { requireAuth } from "../../utils";
import noImage from "../../img/no_image.png";
import { DbMovieCardLoaderData } from "../../interfaces";

export async function loader(
  { request, params }: { request: Request, params: Params }
  ) {
  await requireAuth(request);
  const id = parseInt(params.id || '');
  const movie = await getDbMovieById(id);
  return movie;
}

export default function DbMovieCard() {
  const { 
      state, 
      pathname, 
      search: searchValue 
  } = useLocation();
  const search = state?.search || searchValue;
  const movie = useLoaderData() as DbMovieCardLoaderData
  const { 
      title = '-', 
      overview = '-', 
      homepage = null, 
      poster_path = '-', 
      genres = [] 
  } = movie;

  const imgUrl = poster_path 
      ? (DB_API_IMG + poster_path) 
      : '-';
  const genre = genres[0]?.name ?? '-';
  const validGenre = [
      'action', 
      'comedy', 
      'drama', 
      'animation'
  ].includes(genre.toLowerCase()) || '';

  const data = {
      title,
      overview,
      homepage,
      imgUrl,
      genre: validGenre
    };

  const imgSrc = poster_path 
      ? DB_API_IMG + poster_path 
      : noImage;

  return(
      <div className="flow container">
          <div className="flex flex-space-between">
             <Link 
                  to={`..${search}`} 
                  relative='path'
              >
                  &larr; <span>Back</span>
              </Link>
              <Link
                  to="../../movies/create" 
                  className="text-green"
                  state={{
                      pathname, 
                      search, 
                      data
                  }}
              >
                  Add this movie to favorite
              </Link>
          </div>
          <div className="movie-card-container flex">
              <img className="width-300" src={imgSrc} alt="movie"/>
              <div className="grid">
                  <h2>{title}</h2>
                  <h3><span className="ff-sans-normal ">Genre: </span>{genre}</h3>
                  <p><span className="ff-sans-normal ">Overwiew: </span>{overview}</p>
                  { homepage &&
                      <a
                      className="text-blue ff-sans-normal" 
                      href={homepage} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      >
                      Link To Homepage
                  </a>
                  }
              </div>
          </div>
      </div>
  );
}
