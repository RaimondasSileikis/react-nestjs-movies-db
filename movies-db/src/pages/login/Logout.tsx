import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";


export default function Logout() {
    const [user, setUser] = useState<string | null>(null);
    const loggedInUser = localStorage.getItem('user');
    useEffect(() => {
        setUser(loggedInUser);
    }, [loggedInUser]);
  
    const navigate = useNavigate();
    function handleLogout(){
        setUser(null)
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExpiration');
        navigate("/signIn");
    };

    return (
        <>
            {!user && ( 
                <div className="flex gap-0">
                    <NavLink to='signIn'>
                        Log In
                    </NavLink>
                    <NavLink to='signUp'>
                        Sign Up
                    </NavLink>
                </div>
            )}
            {user && (
                <div className="user-nav">
                    <div className="user-initial">
                        {user.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-detail">
                        <span>{user}</span>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            )}
        </>
    );
}
