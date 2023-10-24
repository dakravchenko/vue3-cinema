<template>
  <div class="greeting-block" v-if="movies.length === 0 && error === null">
    <h1>Hello THERE!</h1>
    <h1>Would you like to find a movie?</h1>
  </div>
  <div class="home">
    <MovieByNameInput @update:query="updateQuery" />
    <ErrorDisplayingMovies :error="error" />
    <Loader v-if="isLoading" />
    <MovieResultsDisplay :movies="movies" />
    <!-- <PagerComponent :pageCount="pageCount" @changePage="updateCurrentPage" /> -->
  </div>
</template>

<script>
import { ref, watch} from 'vue';
import getFilmsByName from '../composables/getFilmsByName';
import MovieResultsDisplay from '../components/MovieResultsDisplay.vue';
import ErrorDisplayingMovies from '../components/ErrorDisplayingMovies.vue';
import MovieByNameInput from '../components/MovieByNameInput.vue';
// import PagerComponent from '../components/PagerComponent.vue';
import Loader from '../components/LoaderComponent.vue'

export default {
  name: 'HomeView',
  components: { MovieResultsDisplay, ErrorDisplayingMovies, MovieByNameInput, Loader},
  setup() {
    const movies = ref([]);
    const error = ref(null);
    const query = ref('');
    const pageCount = ref(null);
    const currentPage = ref(1);
    const isLoading = ref(false);
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


    return { movies, error, query, pageCount, updateQuery, updateCurrentPage, isLoading};
  },
};
</script>

<style>
.greeting-block h1{
  background: linear-gradient(270deg, #90cea1 0%, #01b4e4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  text-align: center;
  font-family: "Epilogue";
  font-weight: 900;
  font-size: 30px;
  line-height: 31px;
  text-transform: uppercase;
}
.greeting-block {
  margin: 30px 0;
}

</style>