const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGRmZjViNjdlNzg5ZDI2MjEyNmY3OTgyMzM4NTk5NSIsInN1YiI6IjYzZjRlYjU3MTUzNzZjMDA3ODE5ZjQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QiSbIkjOMD6l9NBxFIf992bA3K1okvnmturj41HGKi8'
  }
};


export default async function getFilmsById(id) {
   
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error("No film was found");
      }
      const movieData = await res.json();
      console.log(movieData)
      return { data: movieData, errorMessage: null }
    } catch (error) {
      return { data: null, errorMessage: error.message }
    }
  }