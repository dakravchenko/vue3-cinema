<template>
  <div class="pager-wrapper" v-if="pageCount">
    <div class="prev-btn">Prev</div>
    <ul class="buttons">
      <li v-for="buttonValue in buttonsValues" :key="buttonValue" 
      :class="{'active-button': buttonValue === currentPage }"
      >{{ buttonValue }}
    </li>
    </ul>
    <div class="next-btn">Next</div>
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
      
      }
    },
    mounted() {
      this.calculateValuesOfButtons()
    }
    }
</script>

<style>
.pager-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  align-items: center;
  gap: 10px; 
}

.prev-btn,
.next-btn {
  padding: 7px 20px; 
  background-color: #0074e4;
  color: #fff;
  cursor: pointer;
}

.buttons {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 10px;
}

.buttons li {
  padding: 7px 10px; 
  background-color: #f0f0f0; 
  cursor: pointer;
}
.active-button {
  border: 2px solid rgb(10, 9, 9); 
}

.buttons li:hover {
  background-color: #aba2a2;

}
</style>