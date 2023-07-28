import { NavLink } from "react-router-dom"
import Logout from "../pages/login/Logout";

export default function Header() {

    return (
        <header className=" header text-accent bg-blue bg-opacity-05 flex flex-space-between">
            <nav className="flex gap-0" >
                <NavLink 
                    to='/' 
                    className={({isActive}: {isActive: boolean}) => isActive ? "active" : ""}
                >
                    Home
                </NavLink>
                <NavLink 
                    to='moviesdb' 
                    className={({isActive}: {isActive: boolean}) => isActive ? "active" : ""}
                >
                    TMDB
                </NavLink> 
                <NavLink 
                    to='movies' 
                    className={({isActive}: {isActive: boolean}) => isActive ? "active" : ""}
                >
                   My Movies
                </NavLink>
            </nav>
            <Logout/>
        </header>
    );
}
