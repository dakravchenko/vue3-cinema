<template>
    <div class="home">
      <MovieByNameInput/>
      <ErrorDisplayingMovies :error="error"/>
      <MovieResultsDisplay :movies="movies"/>
    </div>
  </template>
  
  <script>
  import { ref, provide, watch} from 'vue'
  import getFilmsByName from '../composables/getFilmsByName'
  import MovieResultsDisplay from '../components/MovieResultsDisplay.vue'
  import ErrorDisplayingMovies from '../components/ErrorDisplayingMovies.vue'
  import MovieByNameInput from '../components/MovieByNameInput.vue'
  
  
  export default {
    name: 'HomeView',
    components: {MovieResultsDisplay, ErrorDisplayingMovies, MovieByNameInput},
    setup(){
      const movies = ref([])
      const error = ref(null)
      const query = ref('')

      provide('query', query)
  
      const fetchMovies = async (query) => {
        const {data, errorMessage} = await getFilmsByName(query)
        if (errorMessage) {
        error.value = errorMessage;
      } else {
        movies.value = data.results;
      }
    } 
     
      watch(query, fetchMovies);
      
      return {movies, error}
    }
  
  }
  </script>