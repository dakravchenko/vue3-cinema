export default async function getGenres() {
    try {
        const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=48dff5b67e789d262126f79823385995&language=en-US");
        if (!res.ok) {
          throw new Error("Discover page is not available. Try again later");
        }
        const genres = await res.json();
        return { data: genres, errorMessage: null }
      } catch (error) {
        return { data: null, errorMessage: error.message }
      }
  }
  