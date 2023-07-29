import { 
    Link, 
    useLocation, 
    useLoaderData, 
    Params 
} from "react-router-dom";
import { getMovieById } from '../../api'
import { requireAuth } from "../../utils";
import noImage from "../../img/no_image.png"
import { MovieData } from "../../interfaces";

export async function loader({ request, params }: { request: Request, params: Params }) {
    await requireAuth(request);
    const id = parseInt(params.id ?? '');
    return getMovieById(id);
}

export default function MovieCard() {
    const { 
        state: { 
            search = '', 
            genre_type = 'all'
        } = {} 
    } = useLocation();
    const { 
        title,
        overview,
        homepage = null,
        imgUrl,
        genre
    } = useLoaderData() as MovieData;
    const imgSrc = imgUrl.length > 0 ? imgUrl : noImage;

    return (
        <div className="flow container">
            <div className="flex flex-space-between">
                <Link
                    to={`..${search}`} 
                    relative='path'
                >
                    &larr; Back to <span className="capitalize text-blue">{genre} </span>
                    movies
                </Link>
                <div className="flex">
                    <Link 
                        className="text-green" 
                        to="edit" 
                        state={{ search, genre_type}}
                    >
                        Edit
                    </Link>
                    <Link 
                        className="text-red" 
                        to="delete" 
                        state={{ search, genre_type}}
                    >
                        Delete
                    </Link>
                </div>
            </div>
            <div className="movie-card-container flex">
                <div >
                    <img className="width-300" src={imgSrc} alt="movie"/>
                </div>
                <div className="grid" >
                    <h3 className={`movie-genre ${genre} selected ff-sans-normal`}>
                        Genre: <span className="uppercase" >{genre}</span> 
                    </h3>
                    <h2>{title}</h2>
                    <p>{overview}</p>
                    {homepage &&
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
