export default async function getFilmsByName(query) {
    const apiKey = '464e0732a4ff7c3b5e09de7baa51e9f2'
   
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Cannot display movies");
      }
      const moviesData = await res.json();
      return { data: moviesData, errorMessage: null }
    } catch (error) {
      return { data: null, errorMessage: error.message }
    }
  }