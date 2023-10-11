<template>
    <router-link :to="{name: 'MovieDetails', params: {id: movie.id}}">
        <img class="poster" :src="movie.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : require('@/assets/no-poster.png')" :alt="movie.title">
    </router-link>
    <h2>{{ getFilmTitleAndRating(movie) }}</h2>
    <h3>{{ movie.overview ? movie.overview : 'Oops no description yet. Perhaps this movie will be described soon' }}</h3>
</template>

<script>
export default {
    props : {
        movie : Object
    },
    setup() {
    const getFilmTitleAndRating = (movie) => {
      const releaseDate = new Date(movie.release_date);
      const releaseYear = releaseDate.getFullYear();
      const voteAverage = movie.vote_average === 0 ? "" : movie.vote_average;
      return `${movie.original_title} (${releaseYear}) ${voteAverage}`;
    };

    return {
      getFilmTitleAndRating
    };
  }
}
</script>

<style>
.poster {
  width: 500px;
  height: 281px;
}

.movie-container h2 {
  color: #505050;
  font-size: 25px;
  font-weight: 500;
  font-family: "Epilogue";
  margin: 30px 0 10px 0;
}
.movie-container h3 {
  color: #505050;
  font-size: 15px;
  font-weight: 400;
  font-family: "Epilogue";
  line-height: 1.4;
}

@media (max-width: 1600px) {
  .poster {
    width: 400px;
    height: 225px;
  }
}
@media (max-width: 460px) {
  .poster {
    width: 100%;
  }
}
@media (max-width: 400px) {
  .poster {
    width: 300px;
    height: 168px;
  }
}
</style>