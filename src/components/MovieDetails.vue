<template>
  <div v-if="movie" class="movie-details">
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
export default {
    props: ['movie']
}
</script>

<style>

</style>