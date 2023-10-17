<template>
  <div>
    <div class="discover-filters">
      <div class="filter-container">
        <input
          class="filter"
          placeholder="Year"
          type="number"
          min="1900"
          max="2026"
          step="1"
          v-model="year"
        />
      </div>
      <div class="filter-container">
        <select class="filter" v-model="genre">
          <option :value="null">All genres</option>
          <option v-for="genre in possibleGenres" :key="genre" :value="genre">
            {{ genre }}
          </option>
        </select>
      </div>
      <div class="filter-container">
        <input
          class="filter"
          placeholder="Average vote"
          type="number"
          min="0"
          max="10"
          step="1"
          v-model="vote"
        />
      </div>
      <div class="filter-container">
        <input class="filter" placeholder="Key word" v-model="keyword" />
      </div>
      <div class="filter-container">
        <button class="apply-button filter" @click="applyFilters">apply</button>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { ref, onMounted } from "vue";
  import getGenres from '../composables/getGenres'
  import getFilmsWithFilters from '../composables/getFilmsWithFilters'
  
  export default {
    setup() {
      const year = ref("");
      const genre = ref(null);
      const vote = ref("");
      const keyword = ref("");
      const possibleGenres = ref([]);
  
      onMounted(async () => {
        possibleGenres.value = await getGenres();
      });
  
      const applyFilters = async () => {
        const movies = await getFilmsWithFilters(year.value, genre.value, vote.value, keyword.value);
        console.log(movies)
      };
  
      return {
        year,
        genre,
        vote,
        keyword,
        possibleGenres,
        applyFilters,
      };
    },
  };
  </script>
 <style scoped>
 .discover-filters {
   width: 100%; 
   display: flex;
   flex-direction: column; 
   align-items: center; 
   margin-top: 20px
 }
 
 .filter-container {
   width: 25%;
   margin-bottom: 20px;
 }
 
 .discover-filters input,
 .discover-filters select,
 .discover-filters button {
   width: 100%;
   padding: 15px;
   margin: 0;
   border: 2px solid #958d8d;
   border-width: thick;
   border-radius: 50px;
 }
 
 select,
 option {
   font-size: 20px;
   font-family: "Inter";
 }
 
 @media (max-width: 900px) {
   .filter-container {
     width: 40%; /* На планшетах занимают 40% экрана */
   }
 }
 
 @media (max-width: 460px) {
   .filter-container {
     width: 80%; /* На мобильных устройствах занимают 80% экрана */
   }
 }
 </style>