<template>
  <router-link :to="{ name: 'MovieDetails', params: { id: movie.id } }">
    <img class="poster" :src="getBackdropPath" :alt="movie.title" />
  </router-link>
  <h2>{{ movieTitleAndRating }}</h2>
  <h3>{{ movieDescription }}</h3>
</template>

<script>
export default {
  props: {
    movie: Object,
  },
  methods: {
    getFilmTitleAndRating(movie) {
      const releaseDate = new Date(movie.release_date);
      const releaseYear = releaseDate.getFullYear();
      const voteAverage = movie.vote_average === 0 ? "" : movie.vote_average;
      return `${movie.original_title} (${releaseYear}) ${voteAverage}`;
    },
  },
  computed: {
    getBackdropPath() {
      return this.movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w500/${this.movie.backdrop_path}`
        : require('@/assets/no-poster.png');
    },
    movieTitleAndRating() {
      return this.getFilmTitleAndRating(this.movie);
    }, 
    movieDescription() {
      return this.movie.overview
        ? this.movie.overview
        : "Oops no description yet. Perhaps this movie will be described soon";
    },
  },
};
</script>

<style scoped>
.poster {
  width: 100%;
  height: auto;
}

h2 {
  color: #505050;
  font-size: 25px;
  font-weight: 500;
  font-family: "Epilogue";
  margin: 30px 0 10px 0;
}

h3 {
  color: #505050;
  font-size: 15px;
  font-weight: 400;
  font-family: "Epilogue";
  line-height: 1.4;
}

@media (max-width: 1600px) {
  .poster {
    max-width: 400px;
  }
}

@media (max-width: 460px) {
  .poster {
    max-width: 100%;
  }
}

@media (max-width: 400px) {
  .poster {
    max-width: 300px;
  }
}
</style>