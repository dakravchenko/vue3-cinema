import { ref, computed } from 'vue';

export default function useMovieFilter(initialMovies) {
  const selectedGenres = ref([]);

  const filteredMovies = computed(() => {
    if (selectedGenres.value.length === 0) {
      return initialMovies;
    }

    return initialMovies.filter((movie) => {
      return selectedGenres.value.every((genreId) => {
        return movie.genre_ids.includes(genreId);
      });
    });
  });

  const toggleGenre = (genreId) => {
    if (selectedGenres.value.includes(genreId)) {
      selectedGenres.value = selectedGenres.value.filter((id) => id !== genreId);
    } else {
      selectedGenres.value.push(genreId);
    }
  };

  return {
    selectedGenres,
    toggleGenre,
    filteredMovies,
  };
}