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
