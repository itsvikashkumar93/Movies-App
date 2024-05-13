import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGYwMGFlMGNkYTg5NGM1OWE1ZmMwNmUyMGJlYjQ1NCIsInN1YiI6IjY2MzIzZTVlNjY1NjVhMDEyNjEzNDFkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4X0nopKD3KM1PqYwcOuo6UJFprCjU1Lsp6xftSwTXgs",
  },
});

export default instance;
