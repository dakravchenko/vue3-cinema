const apiKey = '48dff5b67e789d262126f79823385995'


export default async function getFilmsById(id) {
   
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}?language=en-US`;
    try {
      const res = await fetch(url);
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