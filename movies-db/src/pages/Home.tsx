import { Link } from "react-router-dom";

export async function loader() {
    return null;
}
  
export default function Home() {
    return (
        <div className="flow container">
            <h2 className="flex flex-center container">Welcome to My Awesome Website</h2>
            <div className="flow">
                <h3>Discover amazing movies, create your own collection, and more!</h3>
                <Link className=" text-blue ff-sans-normal" to="signIn">
                    Get Started &rarr;
                </Link>
            </div>
            <div className="flow">
                <h3 className="flex flex-center">Explore Movies</h3>
                <p>Discover a vast collection of movies from various genres.</p>
                <Link className=" text-blue" to="moviesdb">
                Link to TMDB &rarr;
                </Link>
            </div>
            <div className="flow">
                <h3 className="flex flex-center">Create Collections</h3>
                <p>Build and manage your personalized movie collections.</p>
                <p>Add your favorite movies to your list and access them easily.</p>
                <Link className=" text-blue" to="movies">
                Link to My Movies &rarr;
                </Link>
            </div>
            <div className="flow">
                <h3 className="flex flex-center">About Us</h3>
                <p>
                We are passionate about movies and created this platform to help movie lovers
                discover new films and manage their movie collections. Our mission is to provide
                the best movie-related experience to our users.
                </p>
            </div>
            <div className="flow grid grid-items-center">
                <h3 className="">Contact Us</h3>
                <p>Email: contact@myawesomewebsite.com</p>
                <p>Phone: +1 123-456-7890</p>
            </div>
            <div className="flow grid grid-items-center">
                <h3>Follow Us</h3>
                <div className="flex">
                    <a 
                        className="flex text-blue" 
                        href="https://www.facebook.com/" 
                        target="_blank" 
                        rel="noopener noreferrer">
                        <i className="fa fa-facebook"></i>
                    </a>
                <a 
                    className="flex text-blue" 
                    href="https://www.twitter.com/" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <i className="fa fa-twitter"></i>
                </a>
                <a
                    className="flex text-blue" 
                    href="https://www.instagram.com/" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <i className="fa fa-instagram"></i>
                </a>
            </div>
        </div>
    </div>
    );
}
