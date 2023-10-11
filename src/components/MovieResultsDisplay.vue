<template>
    <div v-show='movies' class="main-content">
        <div class="movie-container" v-for="movie in movies" :key="movie.id">
            <MovieCard :movie="movie"/>
        </div>
    </div>
</template>

<script>
import MovieCard from './MovieCard.vue';
export default {
    components: {MovieCard},

    props: {
        movies : Array
    },
    
}
</script>

<style>
.main-content {
  min-height: 100vh;
  margin: 60px 5%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 7%;
  row-gap: 35px;
  justify-items: center;
}
.movie-container {
  width: 500px;
}

</style>