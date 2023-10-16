export default async function getTopMovies(page) {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=48dff5b67e789d262126f79823385995&language=en-US&page=${page}`
    try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Cannot display movies. Try again later");
        }
        const moviesData = await res.json();
        return { data: moviesData, errorMessage: null }
      } catch (error) {
        return { data: null, errorMessage: error.message }
      }
  }