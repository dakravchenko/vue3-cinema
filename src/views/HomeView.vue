<template>
    <div class="home">
      <div v-for="movie in movies" :key="movie.id">
        <p>{{ movie.title }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue'
  import getFilmsByName from '../composables/getFilmsByName'
  
  
  export default {
    name: 'HomeView',
    components: {
    },
    setup(){
      const movies = ref({})
      const error = ref(null)
  
      const fetchMovies = async () => {
        const {data, errorMessage} = await getFilmsByName('avatar')
        movies.value = data
        error.value = errorMessage
      } 
      onMounted(() => {
        fetchMovies()
        
      })
      return {movies, error}
    }
  
  }
  </script>