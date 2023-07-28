import { useRouteError} from "react-router-dom"
import { DbServerErrorResponse } from "../interfaces";

export default function DbError() {
    const dbError = useRouteError() as DbServerErrorResponse
    const status = dbError?.response?.status
    const message = dbError?.response?.data?.status_message
  
    return(
        <div className="flow container grid">
        { dbError.response && 
            <>
                <h2>Status - {status}</h2>
                <pre>Error: {message}</pre>
            </>
        }
        </div>
    )
}
