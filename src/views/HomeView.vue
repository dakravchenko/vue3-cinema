<template>
    <div class="home">
      <MovieByNameInput/>
      <ErrorDisplayingMovies :error="error"/>
      <MovieResultsDisplay :movies="movies"/>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue'
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