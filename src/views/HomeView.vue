<template>
  <div class="home">
    <MovieByNameInput @update:query="query = $event" />
    <ErrorDisplayingMovies :error="error" />
    <MovieResultsDisplay :movies="movies" />
    <PagerComponent :pageCount="pageCount"/>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import getFilmsByName from '../composables/getFilmsByName';
import MovieResultsDisplay from '../components/MovieResultsDisplay.vue';
import ErrorDisplayingMovies from '../components/ErrorDisplayingMovies.vue';
import MovieByNameInput from '../components/MovieByNameInput.vue';
import PagerComponent from '../components/PagerComponent.vue';

export default {
  name: 'HomeView',
  components: { MovieResultsDisplay, ErrorDisplayingMovies, MovieByNameInput, PagerComponent },
  setup() {
    const movies = ref([]);
    const error = ref(null);
    const query = ref('');
    const pageCount = ref(null)
    let timer = null;

    const fetchMovies = async (query) => {
      const { data, errorMessage } = await getFilmsByName(query);
      if (errorMessage) {
        error.value = errorMessage;
      } else {
        movies.value = data.results;
        pageCount.value = data.total_pages
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

    return { movies, error, query, pageCount };
  },
};
</script>