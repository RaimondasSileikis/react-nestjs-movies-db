import { redirect} from "react-router-dom"
import { requireAuth } from "../utils"

export async function loader({ request }: { request: Request }) {
    await requireAuth(request) 
    return redirect(new URL(request.url).pathname + "/list")
}

export default function Dashboard() {
    return null;
}