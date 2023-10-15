export default async function getFilmsByName(query, page) {
    const apiKey = '48dff5b67e789d262126f79823385995'
   
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Cannot display movies. Try again later");
      }
      const moviesData = await res.json();
      console.log(moviesData)
      return { data: moviesData, errorMessage: null }
    } catch (error) {
      return { data: null, errorMessage: error.message }
    }
  }