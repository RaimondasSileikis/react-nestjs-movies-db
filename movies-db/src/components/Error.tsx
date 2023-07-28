import { useRouteError} from "react-router-dom"
import { ServerErrorResponse } from "../interfaces";

export default function Error() {
    const error = useRouteError() as ServerErrorResponse;
    const { statusCode, message } = error?.response?.data
   
    return(
        <div className="flow container grid">
        { error && 
            <>
                <h2>Status - {statusCode}</h2>
                <pre>Error: {message}</pre>
            </>
        }
        </div>
    );
}
