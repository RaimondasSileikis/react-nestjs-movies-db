import {
    Params,
    redirect,
    Form, 
    useLocation, 
    Link,
    useActionData
} from "react-router-dom"
import { deleteMovie } from "../api";
import { requireAuth } from "../utils";
import { ServerErrorResponse } from "../interfaces";
import ActionDataError from "./ActionDataError";

export async function loader({ request, params}: { request: Request, params: Params }) {
    await requireAuth(request);
    const id = parseInt(params.id || '');
    return id;
}

export async function action({ params, request }: { params:Params, request: Request }) {
    const deleteMovieFormData = await request.formData()
    const search = (deleteMovieFormData.get('search') ?? '') as string;
    const pathname = (deleteMovieFormData.get('pathname') ?? '') as string;
    const id = parseInt(params.id || '');
    try {
        await deleteMovie(id)
        return redirect(`${pathname + search}`
        )
    } catch(err) {
        return {err};
    };
}

export default function MovieDelete() {
    const { 
        pathname,
        search = '', 
        genre_type
    } = (useLocation().state || {});
    const actionData = useActionData() as {
        err: ServerErrorResponse
    };
    const actionDataError = actionData?.err;
   
    return (
        <div className="flow container grid grid-items-center">
            <h3>Do you really want to delete?</h3>
            <div className="flex" >
                <Form method="delete">
                    <input hidden name='search' defaultValue={search} />
                    <input hidden name='pathname' defaultValue={pathname} />
                    <button type="submit" className="bg-red ">Yes</button>
                </Form>
                <button className="bg-yellow">
                    <Link 
                        to=".." 
                        relative='path' 
                        state={{pathname, search, genre_type}}>
                        No
                    </Link>
                </button>
            </div>
            <div>
              {actionDataError && (
                <ActionDataError error={actionDataError}/>
                )}  
            </div>
        </div>
    );
}
