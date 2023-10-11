<template>
    <div class="home">
      <ErrorDisplayingMovies :error="error"/>
      <MovieResultsDisplay :movies="movies"/>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue'
  import getFilmsByName from '../composables/getFilmsByName'
  import MovieResultsDisplay from '../components/MovieResultsDisplay.vue'
  import ErrorDisplayingMovies from '../components/ErrorDisplayingMovies.vue'
  
  
  export default {
    name: 'HomeView',
    components: {MovieResultsDisplay, ErrorDisplayingMovies},
    setup(){
      const movies = ref([])
      const error = ref(null)
  
      const fetchMovies = async () => {
        const {data, errorMessage} = await getFilmsByName('avatar')
        if (errorMessage) {
        error.value = errorMessage;
      } else {
        movies.value = data.results;
      }
      } 
      onMounted(() => {
        fetchMovies()
        
      })
      return {movies, error}
    }
  
  }
  </script>