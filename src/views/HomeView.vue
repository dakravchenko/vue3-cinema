<template>
    <div class="home">
      <MovieResultsDisplay :movies="movies"/>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue'
  import getFilmsByName from '../composables/getFilmsByName'
  import MovieResultsDisplay from '../components/MovieResultsDisplay.vue'
  
  
  export default {
    name: 'HomeView',
    components: {MovieResultsDisplay},
    setup(){
      const movies = ref([])
      const error = ref(null)
  
      const fetchMovies = async () => {
        const {data, errorMessage} = await getFilmsByName('avatar')
        movies.value = data.results
        error.value = errorMessage
      } 
      onMounted(() => {
        fetchMovies()
        
      })
      return {movies, error}
    }
  
  }
  </script>