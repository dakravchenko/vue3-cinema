import { computed } from 'vue';

export function useFilterMoviesByGenre(movies, selectedGenreId) {
  const filterMoviesByGenre = () => {
    if (selectedGenreId === null) {
      return movies.value;
    }
    return movies.value.filter((movie) => movie.genre_ids.includes(selectedGenreId));
  };

  const filteredMovies = computed(filterMoviesByGenre);

  return { filteredMovies };
}