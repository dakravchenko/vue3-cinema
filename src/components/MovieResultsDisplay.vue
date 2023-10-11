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
@media (max-width: 1600px) {
  .main-content {
    grid-template-columns: repeat(2, 1fr);
  }
  .movie-container {
    width: 400px;
  }

}
@media (max-width: 900px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 460px) {
  .main-content {
    margin-left: 10px;
    justify-items: flex-start;
  }
  .movie-container {
    width: 97%;
  }
}

</style>