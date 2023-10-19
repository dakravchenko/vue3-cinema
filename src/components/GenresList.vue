<template>
    <div class="genres">
      <span
        v-for="genreId in genreIds"
        :key="genreId"
        class="genre"
        @click="selectGenre(genreId)"
      >
        {{ getGenreName(genreId) }}
      </span>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, provide } from 'vue';
  import getGenres from '../composables/getGenres'
  
  export default {
    props: {
      genreIds: Array,
    },
    setup() {
      const genres = ref([]);
      const selectedGenreId = ref(null);
  
      const getGenreName = (genreId) => {
        const genre = genres.value.find((genre) => genre.id === genreId);
        return genre? genre.name : '';
      };

      const selectGenre = (genreId) => {
      selectedGenreId.value = genreId;
    };

    provide('selectedGenreId', selectedGenreId);
  
        onMounted(async () => {
        const data = await getGenres();
        genres.value = data.data.genres
      });
    
  
      return {
        getGenreName, selectGenre
      };
    },
  };
  </script>

<style>
.genres {
    margin-top: 10px;
  }

  .genre {
    display: inline-block;
    margin-right: 5px;
    padding: 5px 10px;
    background-color: #505050;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
  }
</style>