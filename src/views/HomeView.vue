<template>
  <div class="home">
    <MovieByNameInput @update:query="updateQuery" />
    <ErrorDisplayingMovies :error="error" />
    <Loader v-if="isLoading" />
    <MovieResultsDisplay :movies="displayedMovies" />
    <PagerComponent :pageCount="pageCount" @changePage="updateCurrentPage" />
  </div>
</template>

<script>
import { ref, watch, inject } from 'vue';
import getFilmsByName from '../composables/getFilmsByName';
import MovieResultsDisplay from '../components/MovieResultsDisplay.vue';
import ErrorDisplayingMovies from '../components/ErrorDisplayingMovies.vue';
import MovieByNameInput from '../components/MovieByNameInput.vue';
import PagerComponent from '../components/PagerComponent.vue';
import Loader from '../components/LoaderComponent.vue'
import { useFilterMoviesByGenre } from '../composables/useFilterMoviesByGenre'

export default {
  name: 'HomeView',
  components: { MovieResultsDisplay, ErrorDisplayingMovies, MovieByNameInput, PagerComponent, Loader },
  setup() {
    const movies = ref([]);
    const error = ref(null);
    const query = ref('');
    const pageCount = ref(null);
    const currentPage = ref(1);
    const isLoading = ref(false);
    const selectedGenreId = inject('selectedGenreId', ref(null))
    const displayedMovies = ref([])
    let timer = null;


    const updateQuery = (newQuery) => {
      query.value = newQuery;
    };

    const updateCurrentPage = (newPage) => {
      currentPage.value = newPage;
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
      isLoading.value = true;
      const { data, errorMessage } = await getFilmsByName(query.value, currentPage.value);
      if (errorMessage) {
        error.value = errorMessage;
      } else {
        movies.value = data.results;
        displayedMovies.value = data.results;
        pageCount.value = data.total_pages;
      }
      isLoading.value = false;
    };

    watch(query, () => {
      refreshData();
    });

    watch(currentPage, () => {
      refreshData();
    });

// Добавьте вывод значения selectedGenreId для отладки
console.log('selectedGenreId:', selectedGenreId.value);

// ...

watch(selectedGenreId, (newGenreId) => {
  console.log('selectedGenreId changed:', newGenreId);
  selectedGenreId.value = newGenreId;
  displayedMovies.value = useFilterMoviesByGenre(movies.value, selectedGenreId.value);
});


    return { movies, error, query, pageCount, updateQuery, updateCurrentPage, isLoading, displayedMovies };
  },
};
</script>