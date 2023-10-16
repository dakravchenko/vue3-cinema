<template>
  <LoaderComponent v-if="isLoading"/>
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
import LoaderComponent from '../components/LoaderComponent.vue';

export default {
  name: 'MovieDetailsView',
  components: { MovieDetails, ErrorDisplayingMovies, LoaderComponent },
  props: ['id'],
  setup(props) {
    const movie = ref(null);
    const error = ref(null);
    const isLoading = ref(false);

    const fetchMovie = async () => {
      isLoading.value= true
      const { data, errorMessage } = await getFilmsById(props.id);
      if (errorMessage) {
        error.value = errorMessage;
      } else {
        movie.value = data;
      }
      isLoading.value= false
    };

    onMounted(fetchMovie);

    return { movie, error, isLoading };
  },
};
</script>
