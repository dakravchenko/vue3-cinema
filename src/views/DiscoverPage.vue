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
   margin: 0 auto;
   display: flex;
   flex-direction: column; /* Располагаем элементы вертикально */
   align-items: center; /* Центрируем элементы по горизонтали */
 }
 
 .filter-container {
   width: 80%; /* На мобильных устройствах занимают 80% экрана */
   margin-bottom: 10px; /* Отступ между элементами */
 }
 
 .discover-filters input,
 .discover-filters select,
 .discover-filters button {
   width: 100%; /* На всех экранах занимают всю ширину своего контейнера */
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
 
 @media (min-width: 901px) {
   .filter-container {
     width: 25%; /* На больших экранах занимают четверть экрана */
   }
 
   .discover-filters {
     width: 25%; /* Добавляем ширину контейнеру на больших экранах */
   }
 }
 
 @media (min-width: 461px) and (max-width: 900px) {
   .filter-container {
     width: 33%; /* На планшетах занимают треть экрана */
   }
 
   .discover-filters {
     width: 33%; /* Добавляем ширину контейнеру на планшетах */
   }
 }
 </style>