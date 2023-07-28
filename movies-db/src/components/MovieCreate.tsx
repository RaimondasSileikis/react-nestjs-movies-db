import { createMovie } from "../api"
import { 
    Form, 
    redirect,
    useActionData, 
    useLocation, 
    Link 
} from "react-router-dom";
import { requireAuth } from "../utils";
import { ServerErrorResponse } from "../interfaces";
import ActionDataError from "./ActionDataError";

type RedirectState = {
    pathname: string;
    search: string;
    status?: number;
}

export async function loader({ request}: {request: Request}) {
    await requireAuth(request)
    return null
}

export async function action({ request }: {request: Request}) {
    const createMovieFormData = await request.formData()
    const title = (createMovieFormData.get('title') ?? '') as string;
    const overview = (createMovieFormData.get('overview') ?? '') as string;
    const homepage = (createMovieFormData.get('homepage') ?? '') as string;
    const imgUrl = (createMovieFormData.get('imgUrl') ?? '') as string;
    const genre = (createMovieFormData.get('genre') ?? '') as string;
    const search = (createMovieFormData.get('search') ?? '') as string;
    const pathname = (createMovieFormData.get('pathname') ?? '') as string;
    const state:RedirectState = { pathname, search };
        
    try {
        await createMovie({
            title, 
            overview, 
            homepage, 
            imgUrl, 
            genre
        })
        return redirect(
            `${pathname + search }`, 
            state
        )
    } catch(err) {
        return {error: err, pathname, search}
    };
}

export default function MovieCreate() {
    const actionData = useActionData() as {
        error: ServerErrorResponse, 
        pathname: string, 
        search: string
    };
    const actionDataError = actionData?.error;
    const { state } = useLocation();
    const { 
        title, 
        overview, 
        homepage, 
        imgUrl, 
        genre 
    } = state?.data || {};
    const search = ( state?.search || actionData?.search ) || '';
    const pathname = ( state?.pathname || actionData?.pathname ) || '';


    return(
        <div className="flow container">
            <Link to={`${pathname + search}`}>&larr; Back</Link> 
            <div className="flow container grid grid-items-center width-300">
                <Form 
                    className="grid" 
                    replace 
                    method="post"  
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
                    defaultValue={genre || ''}
                    >
                        <option value="" disabled>Select genre</option>
                        <option value="action">Action</option>
                        <option value="comedy">Comedy</option>
                        <option value="drama">Drama</option>
                        <option value="animation">Animation</option>
                    </select>
                    <input hidden name='search' defaultValue={search} />
                    <input hidden name='pathname' defaultValue={pathname} />
                    <button 
                        className="bg-green" 
                        type="submit"
                    >
                        Add
                    </button>
                </Form>
                {actionDataError && (
                    <ActionDataError error={actionDataError} />
                )}
            </div>
        </div>
    );
}
