import { 
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements 
} from 'react-router-dom';
import './styles/index.scss';
import Layout from './components/Layout';
import Home from './pages/Home';
import SignIn from './pages/login/SignIn';
import SignUp from './pages/login/SignUp';
import Logout from './pages/login/Logout';
import MoviesLayout from './components/MoviesLayout';
import Dashboard from './components/Dashboard';
import DbMovies from './pages/dbMovies/DbMovies';
import DbMovieCard from './pages/dbMovies/DbMovieCard';
import Movies from './pages/movies/Movies';
import MovieCard from './pages/movies/MovieCard';
import MovieCreate from './components/MovieCreate';
import MovieEdit from './components/MovieEdit';
import MovieDelete from './components/MovieDelete';
import NotFound from './pages/NotFound';



const router = createBrowserRouter(createRoutesFromElements(
  <Route 
    path='/' 
    element={<Layout/>} 
  >
    <Route 
      index 
      element={<Home/>}
    />
    <Route 
      path='signin' 
      element={<SignIn/>} 
    />
    <Route 
      path='signup' 
      element={<SignUp/>} 
    />
    <Route 
      path='logout' 
      element={<Logout/>}
    />
    <Route 
      path='moviesdb' 
      element={<MoviesLayout/>} 
    >
      <Route 
        index element={<Dashboard />}
      />
      <Route 
        path='list' 
        element={<DbMovies/>} 
      />
      <Route 
        path='list/:id' 
        element={<DbMovieCard/>} 
      />
    </Route>
    <Route 
      path='movies' 
      element={<MoviesLayout/>} 
    >
      <Route 
        index 
        element={<Dashboard/>} 
      />
      <Route 
        path='list' 
        element={<Movies/>} 
      />
      <Route 
        path='create'
        element={<MovieCreate/>} 
      />
      <Route 
        path='list/:id' 
        element={<MoviesLayout/>}
      >
        <Route 
          index 
          element={<MovieCard/>}
        />
        <Route 
          path='edit' 
          element={<MovieEdit/>}
        />
        <Route
          path='delete' 
          element={<MovieDelete/>}
        />
      </Route>
    </Route>
    <Route path='*' element={<NotFound/>}/>
  </Route>
));

function App() {
  return (
     <RouterProvider router={router}/>
  );
}

export default App;
