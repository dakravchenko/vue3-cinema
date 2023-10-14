<template>
  <div class="home">
    <MovieByNameInput @update:query="query = $event" />
    <ErrorDisplayingMovies :error="error" />
    <MovieResultsDisplay :movies="movies" />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import getFilmsByName from '../composables/getFilmsByName';
import MovieResultsDisplay from '../components/MovieResultsDisplay.vue';
import ErrorDisplayingMovies from '../components/ErrorDisplayingMovies.vue';
import MovieByNameInput from '../components/MovieByNameInput.vue';

export default {
  name: 'HomeView',
  components: { MovieResultsDisplay, ErrorDisplayingMovies, MovieByNameInput },
  setup() {
    const movies = ref([]);
    const error = ref(null);
    const query = ref('');
    let timer = null;

    const fetchMovies = async (query) => {
      const { data, errorMessage } = await getFilmsByName(query);
      if (errorMessage) {
        error.value = errorMessage;
      } else {
        movies.value = data.results;
      }
    };

    const handleInput = (query) => {
      clearTimeout(timer);

      if (query.trim().length === 0) {
        return;
      }

      timer = setTimeout(() => {
        fetchMovies(query);
      }, 1000);
    };

    watch(query, handleInput);

    return { movies, error, query };
  },
};
</script>