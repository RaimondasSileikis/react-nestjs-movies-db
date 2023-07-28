import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export async function loader() {
    return null
  }

export default function Layout() {
    
    return(
        <div className="layout">
            <Header/>
            <main className="">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
}
