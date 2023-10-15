<template>
  <div class="pager-wrapper" v-if="pageCount">
    <div class="prev-btn"></div>
    <ul class="buttons">
      <li v-for="buttonValue in buttonsValues" :key="buttonValue">{{ buttonValue }}</li>
    </ul>
    <div class="next-btn"></div>
  </div>
</template>

<script>
export default {
    props: {
        pageCount : Number
    },
    data(){
      return {
        currentPage : 1,
        buttonsValues : []
      }
    },
    methods: {
      calculateValuesOfButtons(){
        this.buttonsValues = []
        if(this.pageCount <= 5 || this.currentPage === 1){
          for (let x = 1; x <= this.pageCount || x <= this.currentPage + 4 ; x++){
            this.buttonsValues.push(x)
          }
        } else if(this.currentPage >= 3 && this.pageCount >= 6){
          this.buttonsValues.push(1)
          this.buttonsValues.push(this.currentPage)
          for (let x = this.currentPage; x <= this.currentPage + 3 || x <= this.pageCount; x++){
            this.buttonsValues.push(x)
          }
        }
        console.log(this.buttonsValues)
      }
    },
    mounted() {
      this.calculateValuesOfButtons()
    }
    }
</script>

<style>

</style>