import { 
    useLoaderData, 
    Form, 
    useLocation, 
    Link,
    redirect,
    useActionData,
    Params
} from "react-router-dom";
import { editMovie, getMovieById } from "../api";
import { requireAuth } from "../utils";
import { MovieData, ServerErrorResponse } from "../interfaces";
import ActionDataError from "./ActionDataError";


export async function loader({ request, params }: { request: Request, params: Params}) {
    await requireAuth(request);
    const id = parseInt(params.id || '');
    return getMovieById(id);
}

export async function action({ request, params}: { request: Request, params: Params}) {
    const id = parseInt(params.id || '') as number;
    const editMovieFormData = await request.formData()
    const title = (editMovieFormData.get('title') ?? '') as string;
    const overview = (editMovieFormData.get('overview') ?? '') as string;
    const homepage = (editMovieFormData.get('homepage') ?? '') as string;
    const imgUrl = (editMovieFormData.get('imgUrl') ?? '') as string;
    const genre = (editMovieFormData.get('genre') ?? '') as string;
    const search = (editMovieFormData.get('search') ?? '') as string;
    const pathname = (editMovieFormData.get('pathname') ?? '') as string;
    const genre_type = (editMovieFormData.get('genre_type') ?? '') as string;
    
   try {
       await editMovie(
        id, 
        {
            title, 
            overview, 
            homepage, 
            imgUrl, 
            genre
        });
    return redirect(`${ pathname + search }`)
   } catch(err) {
    return { error: err, pathname, search, genre_type }
   };
}

export default function MovieEdit() {
    const { 
        title, 
        overview, 
        homepage, 
        imgUrl, 
        genre 
    } = useLoaderData() as MovieData;
   
    const actionData = useActionData() as {
        error: ServerErrorResponse, 
        pathname: string, 
        search: string,
        genre_type: string
    };
    const actionDataError = actionData?.error;
    const { state } = useLocation();
    const search = ( state?.search || actionData?.search ) || '';
    const pathname = ( state?.pathname || actionData?.pathname ) || '';
    const genre_type = ( state?.genre_type || actionData?.genre_type ) || '';
 
    return(
        <div className="flow container">
            <Link 
                to=".." 
                relative='path' 
                state={{pathname, search, genre_type}}
            >
                &larr; <span>Back </span>
            </Link>
            <div className="flow container grid grid-items-center width-300">
                <Form 
                    className="grid" 
                    replace  
                    method="patch"
                >
                    <input 
                    name="title"
                    type="text"
                    placeholder="Title"
                    defaultValue={title}
                    />
                    <input 
                    name="homepage"
                    type="text"
                    placeholder="Homepage Url"
                    defaultValue={homepage}
                    />
                    <input 
                    name="imgUrl"
                    type="text"
                    placeholder="Image Url"
                    defaultValue={imgUrl}
                    />
                    <textarea  
                    name="overview"
                    placeholder="Description"
                    defaultValue={overview}
                    />
                    <select 
                    name="genre"
                    id="genre"
                    defaultValue={genre}
                    >
                        <option value="action">Action</option>
                        <option value="comedy">Comedy</option>
                        <option value="drama">Drama</option>
                        <option value="animation">Animation</option>
                    </select>
                    <input hidden name='search' defaultValue={search} />
                    <input hidden name='pathname' defaultValue={pathname} />
                    <input hidden name='genre_type' defaultValue={genre_type} />
                    <button 
                        className="bg-green" 
                        type="submit"
                    >
                        edit
                    </button> 
                </Form>
                {actionDataError && (
                    <ActionDataError error={actionDataError}/>
                )}
            </div>
        </div>
    );
}
