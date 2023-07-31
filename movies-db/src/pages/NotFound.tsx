import { Link } from "react-router-dom";
export default function NotFound() {

    return (
        <div className="flow container grid">
            <h3>Sorry, the page you were looking for was not found!</h3>
            <button className="text-blue">
                <Link to='/'>Return to Home</Link>
            </button>
            
        </div>
    );
}
