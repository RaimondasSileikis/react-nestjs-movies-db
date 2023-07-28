import axios from "axios";
import { 
  LoginData, 
  UserData, 
  ApiMovieData 
} from "./interfaces";

export const CLIENT_URL = 'http://localhost:3302';
export const DB_API_URL = 'https://api.themoviedb.org/3';
export const DB_API_IMG = 'https://image.tmdb.org/t/p/w500';

export async function login(data:LoginData) {
  const res = await axios.post(`${CLIENT_URL}/auth/signin`, data);
  return res.data;
}

export async function createUser(data:UserData) {
  const res = await axios.post(`${CLIENT_URL}/auth/signup`, data);
  return res.data;
}

export async function getMovies() {
  const res = await axios.get(`${CLIENT_URL}/movies`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
  });
  return res.data;
}

export async function getMovieById(id:number) {
  const res = await axios.get(`${CLIENT_URL}/movies/${id}`, {
    headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
  });
  return res.data;
}

export async function createMovie(data:ApiMovieData) {
  const res = await axios.post(`${CLIENT_URL}/movies`, 
    data, {
      headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }
    }
  );
  return res.data;
}

export async function editMovie(id:number, data:ApiMovieData) {
  const res = await axios.patch(`${CLIENT_URL}/movies/${id}`,
    data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }
    }
  );
  return res.data;
}

export async function deleteMovie(id:number) {
  const res = await axios.delete(`${CLIENT_URL}/movies/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }
    }
  );
  return res;
}

export async function getDbMovies(search:string) {
  const res = await axios.get(`${DB_API_URL}/search/movie`, {
    params: {
      api_key: process.env.REACT_APP_DB_API_KEY,
      language: "en-US",
      query: search
    }
  });
  return res.data.results;
}

export async function getDbMovieById(id:number) {
  const res = await axios.get(`${DB_API_URL}/movie/${id}`, {
    params: {
      api_key: process.env.REACT_APP_DB_API_KEY,
    }
  });
  return res.data;
}
