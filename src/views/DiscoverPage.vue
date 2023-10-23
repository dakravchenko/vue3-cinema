<template>
  <div v-if="isFilterSection">
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
          <option v-for="genre in optionGenres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
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
  <div v-if="!isFilterSection && movies.length === 0">
    <div class="return-container">
      <button class="return-button" @click="returnToFilters">Return to Filters</button>
    </div>
    <div class="error-container">
      <h2>Unfortunately, there are no movies matching the selected filters.</h2>
      <h2>Try using other filters.</h2>
    </div>
  </div>
  <div v-if="!isFilterSection && movies.length > 0">
    <div class="return-container">
      <button class="return-button" @click="returnToFilters">Return to Filters</button>
    </div>
    <ErrorDisplayingMovies :error="error" />
    <Loader v-if="isLoading" />
    <MovieResultsDisplay :movies="movies" />
  </div>
</template>
  
  <script>
  import { ref, onMounted } from "vue";
  import getGenres from '../composables/getGenres'
  import getFilmsWithFilters from '../composables/getFilmsWithFilters'
  import MovieResultsDisplay from '../components/MovieResultsDisplay.vue';
  import ErrorDisplayingMovies from '../components/ErrorDisplayingMovies.vue';
  import Loader from '../components/LoaderComponent.vue'
  
  export default {
    components: { MovieResultsDisplay, ErrorDisplayingMovies, Loader },
    setup() {
      const isFilterSection = ref(true)
      const year = ref("");
      const genre = ref(null);
      const vote = ref("");
      const keyword = ref("");
      let optionGenres = ref([]);

      const movies = ref([]);
    const error = ref(null);
    const isLoading = ref(false);
  
      onMounted(async () => {
        const data = await getGenres();
        optionGenres.value = data.data.genres
     
      });
  
      const applyFilters = async () => {
        isFilterSection.value = false
        isLoading.value = true;
        const { data, errorMessage } = await getFilmsWithFilters(year.value, genre.value, vote.value, keyword.value);
        if (errorMessage) {
        error.value = errorMessage;
      } else {
        movies.value = data.results;
      }
      isLoading.value = false;
      };

      const returnToFilters = () => {
      isFilterSection.value = true;
    };
  
      return {
        year,
        genre,
        vote,
        keyword,
        optionGenres,
        applyFilters,
        isFilterSection,
        movies,
        error,
        isLoading,
        returnToFilters
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
  margin-top: 20px;
}

.return-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
  margin: 0 auto;
}

.return-button {
  width: 20%;
  padding: 15px;
  margin: 0 auto; 
  border: 2px solid #958d8d;
  border-width: thick;
  border-radius: 50px;
  font-size: 20px;
  font-family: "Inter";
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
option, 
.apply-button {
  font-size: 20px;
  font-family: "Inter";
}



@media (max-width: 900px) {
  .filter-container {
    width: 40%;
  }
}

@media (max-width: 460px) {
  .filter-container {
    width: 80%;
  }
}
</style>