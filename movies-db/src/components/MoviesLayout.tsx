import { Outlet } from "react-router-dom";
import { requireAuth } from "../utils";

export async function loader({ request }: { request: Request}) {
    requireAuth(request);
    return null;
}

export default function MoviesLayout() {

    return (
        <Outlet/>
    );
}