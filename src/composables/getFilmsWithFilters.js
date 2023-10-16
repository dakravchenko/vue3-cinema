export default async function getFilmsWithFilters(year, genre, vote, keyword) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=48dff5b67e789d262126f79823385995&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${year}&vote_average.gte=${vote}&with_genres=${genre}&with_keywords=${keyword}&with_watch_monetization_types=flatrate`;
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
