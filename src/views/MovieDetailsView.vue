<template>
  <div class="movie-details">
    <ErrorDisplayingMovies :error="error" />
    <MovieDetails :movie="movie" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import getFilmsById from '../composables/getFilmById';
import MovieDetails from '../components/MovieDetails.vue';
import ErrorDisplayingMovies from '../components/ErrorDisplayingMovies.vue';

export default {
  name: 'MovieDetailsView',
  components: { MovieDetails, ErrorDisplayingMovies },
  props: ['id'],
  setup(props) {
    const movie = ref(null);
    const error = ref(null);

    const fetchMovie = async () => {
      const { data, errorMessage } = await getFilmsById(props.id);
      if (errorMessage) {
        error.value = errorMessage;
      } else {
        movie.value = data;
      }
    };

    onMounted(fetchMovie);

    return { movie, error };
  },
};
</script>

<style>
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