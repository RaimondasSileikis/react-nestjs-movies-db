import { Outlet } from "react-router-dom";

export async function loader() {
    return null
  }

export default function MoviesLayout() {

    return (
        <Outlet/>
    );
}
