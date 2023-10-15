<template>
  <div class="pager-wrapper" v-if="pageCount">
    <button @click="() => currentPage--" class="prev-btn" :disabled="currentPage === 1">Prev</button>
    <ul class="buttons">
      <li @click="() => currentPage = buttonValue" v-for="buttonValue in buttonsValues" :key="buttonValue" 
      :class="{'active-button': buttonValue === currentPage }"
      >{{ buttonValue }}
    </li>
    </ul>
    <button @click="() => currentPage++" class="next-btn" :disabled="currentPage === pageCount">Next</button>
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
      calculateValuesOfButtons() {
  this.buttonsValues = []
  const currentPage = this.currentPage
  const maxButtons = 5

  if (this.pageCount <= maxButtons) {
    for (let x = 1; x <= this.pageCount; x++) {
      this.buttonsValues.push(x)
    }
  } else if (this.pageCount > maxButtons && currentPage === 1) {
    for (let x = 1; x <= maxButtons; x++) {
      this.buttonsValues.push(x)
    }
  } else if (this.pageCount > maxButtons && currentPage !== 1) {
    this.buttonsValues.push(1)
    this.buttonsValues.push(currentPage)
    for (let x = currentPage + 1; x <= currentPage + 3 && x <= this.pageCount; x++) {
      this.buttonsValues.push(x)
    }
  }
}
    },
    updated() {
      this.calculateValuesOfButtons()
      console.log(this.currentPage)
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
button:disabled {
  background-color: #c2adad;
  cursor: not-allowed;
  pointer-events: none;
}
</style>