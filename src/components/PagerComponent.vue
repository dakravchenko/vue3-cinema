<template>
  <div v-if="pageCount">
    {{ pageCount }}
  </div>
</template>

<script>
export default {
    props: {
        pageCount : Number
    }
}
</script>

<style>

</style>