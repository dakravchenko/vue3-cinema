<template>
    <div class="home">
      <ErrorDisplayingMovies :error="error" />
      <Loader v-if="isLoading" />
      <MovieResultsDisplay :movies="movies" />
      <PagerComponent :pageCount="pageCount" @changePage="updateCurrentPage" />
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import getTopMovies from '../composables/getTopMovies';
import MovieResultsDisplay from '../components/MovieResultsDisplay.vue';
import ErrorDisplayingMovies from '../components/ErrorDisplayingMovies.vue';
import PagerComponent from '../components/PagerComponent.vue';
import Loader from '../components/LoaderComponent.vue'

export default {
  name: 'HomeView',
  components: { MovieResultsDisplay, ErrorDisplayingMovies, PagerComponent, Loader },
  setup() {
    const movies = ref([]);
    const error = ref(null);
    const pageCount = ref(null);
    const currentPage = ref(1);
    const isLoading = ref(false);

    const updateCurrentPage = (newPage) => {
      currentPage.value = newPage;
    };


    const fetchData = async () => {
      isLoading.value = true;
      const { data, errorMessage } = await getTopMovies(currentPage.value);
      if (errorMessage) {
        error.value = errorMessage;
      } else {
        movies.value = data.results;
        pageCount.value = data.total_pages;
      }
      isLoading.value = false;
    };

    watch(currentPage, () => {
        fetchData();
    });

    fetchData();

    return { movies, error, pageCount, isLoading, updateCurrentPage };
  },
};
</script>