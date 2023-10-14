<template>
  <div v-if="movie" class="movie-details">
    <div class="movie-details-header">
      <h1>{{ movie.title }}</h1>
      <p v-if="movie.tagline" class="tagline">{{ movie.tagline }}</p>
    </div>
    <div class="movie-details-content">
      <div class="movie-poster">
        <img
          :src="movie.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : require('@/assets/no-poster.png')"
          :alt="movie.title"
        />
      </div>
      <div class="movie-info">
        <p v-if="movie.overview"><strong>Overview:</strong> {{ movie.overview }}</p>
        <p v-if="movie.release_date"><strong>Release Date:</strong> {{ movie.release_date }}</p>
        <p v-if="movie.popularity"><strong>Popularity:</strong> {{ movie.popularity }}</p>
        <p v-if="movie.vote_average"><strong>Vote Average:</strong> {{ movie.vote_average }}</p>
        <p v-if="movie.vote_count"><strong>Vote Count:</strong> {{ movie.vote_count }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movie'],
};
</script>

<style>

</style>