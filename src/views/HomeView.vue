<template>
  <div class="home">
    <MovieByNameInput @update:query="updateQuery" />
    <ErrorDisplayingMovies :error="error" />
    <MovieResultsDisplay :movies="movies" />
    <PagerComponent :pageCount="pageCount" @changePage="updateCurrentPage" />
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
    const pageCount = ref(null);
    const currentPage = ref(1);
    let timer = null;

    const updateQuery = (newQuery) => {
      query.value = newQuery;
      refreshData();
    };

    const updateCurrentPage = (newPage) => {
      currentPage.value = newPage;
      refreshData();
    };

    const refreshData = () => {
      clearTimeout(timer);
      if (query.value.trim().length > 0) {
        timer = setTimeout(() => {
          fetchData();
        }, 1500);
      }
    };

    const fetchData = async () => {
      const { data, errorMessage } = await getFilmsByName(query.value, currentPage.value);
      if (errorMessage) {
        error.value = errorMessage;
      } else {
        movies.value = data.results;
        pageCount.value = data.total_pages;
      }
    };

    watch(query, () => {
      refreshData();
    });

    watch(currentPage, () => {
      refreshData();
    });

    return { movies, error, query, pageCount, updateQuery, updateCurrentPage };
  },
};
</script>