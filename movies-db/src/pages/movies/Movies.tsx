import { Suspense } from "react";
import { 
    Link, 
    useSearchParams, 
    useLoaderData, 
    useLocation,
    defer,
    Await
} from "react-router-dom";
import { getMovies } from '../../api';
import { requireAuth } from "../../utils";
import noImage from "../../img/no_image.png";
import { MovieData } from "../../interfaces";

export async function loader({ request }: { request: Request}) {
    await requireAuth(request);
    const movies = getMovies();
    return defer({movies});
}

export default function Movies() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { pathname } = useLocation()
    const moviesPromise = useLoaderData() as {movies: MovieData[] };
    const genreFilter = searchParams.get('genre_type');
    const sortTitleFilter = searchParams.get('sort_title');

    function handleFilterChange(key: string, value: string | null) {
        setSearchParams(prevParams => {
            value === null 
            ? prevParams.delete(key) 
            : prevParams.set(key, value);
            return prevParams;
        });
    };

    function renderMovies (movies: MovieData[]) {
        const genreFilteredMovies = genreFilter
        ? movies.filter(movie => movie.genre === genreFilter)
        : movies

    const displayedMovies = sortTitleFilter
        ? [...genreFilteredMovies].sort((a, b) =>
            sortTitleFilter === "up"
                ? a.title[0].toLowerCase() < b.title[0].toLowerCase()
                    ? -1
                    : 1
                : b.title[0].toLowerCase() < a.title[0].toLowerCase()
                    ? -1
                    : 1
            )
        : genreFilteredMovies

        const moviesElements = displayedMovies
            .map(({ id, title, imgUrl, genre }, i) => (
                <Link 
                    className="container bg-accent bg-opacity-00"
                    key={id}
                    to={`${id}`} 
                    state={{pathname, search: `?${searchParams.toString()}`, genre_type: genreFilter ?? 'all'}}
                >
                    <div className="flow flex flex-center-align">
                        <h4>{i + 1}.</h4>
                        <img className="width-50" src={imgUrl || noImage} alt="movie"/>
                        <i className={`movie-genre ${genre} selected`}>{genre}</i>
                        <h4 className="">{title}</h4>
                    </div>
                </Link>
            ));

    return (
            <>
                <Link className="flex flex-right text-green"
                    to="../create" 
                    state={{ pathname, search: `?${searchParams.toString()}`}}
                >Create new
                </Link>
                    {['action', 'comedy', 'drama', 'animation'].map(type => (
                        <button
                            key={type}
                            onClick={() => handleFilterChange('genre_type', type)}
                            className={`movie-genre ${type} ${genreFilter === type ? 'selected' : ''}`}
                        >
                        {type}
                        </button>
                    ))}
                    <div className="container flex flex-space-between">
                        <div className="flex">
                            <button
                                className="bg-blue text-white" 
                                onClick={() => handleFilterChange('sort_title', 'up')}       
                            >
                            &#x2191;
                            </button>
                            <button
                                className="bg-blue text-white"
                                onClick={() => handleFilterChange('sort_title', 'down')}
                            >
                            &#x2193;
                            </button>
                        </div>
                        {(genreFilter || sortTitleFilter) && (
                        <button
                            className="clear-filter"
                            onClick={() => {
                                handleFilterChange('genre_type', null);
                                handleFilterChange('sort_title', null);
                            }}
                        >
                        Clear filter
                        </button>
                    )}
                    </div>
                <div>{moviesElements}</div>
            </>
        )
    }

    return (
        <div className="flow container movies-list-container">
            <h3>My Favorite Movies List</h3>
            <Suspense fallback={<h2>Loading movies...</h2>}>
                <Await resolve={moviesPromise.movies}>
                    {renderMovies}
                </Await>
             </Suspense>
        </div>
    );
}
