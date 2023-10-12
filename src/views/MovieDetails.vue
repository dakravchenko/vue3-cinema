<template>
  <div class="movie-details">
    <div class="movie-details-header">
      <h1>{{ movie.title }}</h1>
      <p class="tagline">{{ movie.tagline }}</p>
    </div>
    <div class="movie-details-content">
      <div class="movie-poster">
        <img :src="movie.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : require('@/assets/no-poster.png')" :alt="movie.title" />
      </div>
      <div class="movie-info">
        <p><strong>Overview:</strong> {{ movie.overview }}</p>
        <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
        <p><strong>Popularity:</strong> {{ movie.popularity }}</p>
        <p><strong>Vote Average:</strong> {{ movie.vote_average }}</p>
        <p><strong>Vote Count:</strong> {{ movie.vote_count }}</p>
    
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import getFilmsById from '../composables/getFilmById'
export default {
    name: 'MovieDetails',
    props: ['id'],
    setup(props){
        const movie = ref({})
        const error = ref(null)

        const fetchMovie = async () => {
        const {data, errorMessage} = await getFilmsById(props.id)
        if (errorMessage) {
        error.value = errorMessage;
      } else {
        movie.value = data;
      }
      } 
      onMounted(() => {
        fetchMovie()
        
      })
      return {movie, error}
    }

}
</script>

<style scoped>
.movie-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
}

.movie-details-header {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin: 0;
}

.tagline {
  font-style: italic;
  color: #555;
}

.movie-poster img {
  max-width: 100%;
  height: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.movie-info {
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

strong {
  font-weight: bold;
}
</style>