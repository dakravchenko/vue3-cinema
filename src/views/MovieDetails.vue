<template>
   <h2>{{ movie.title }}</h2>
</template>

<script>
import { onMounted, ref } from 'vue'
import getFilmsById from '../composables/getFilmById'
export default {
    name: 'MovieDetails',
    props: ['id'],
    setup(props){
        const movie = ref({})
        const error = ref(null)

        const fetchMovie = async () => {
        const {data, errorMessage} = await getFilmsById(props.id)
        if (errorMessage) {
        error.value = errorMessage;
      } else {
        movie.value = data;
      }
      } 
      onMounted(() => {
        fetchMovie()
        
      })
      return {movie, error}
    }

}
</script>

<style>

</style>