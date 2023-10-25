<template>
  <div class="pager-wrapper" v-if="pageCount">
    <button @click="previousPage" class="prev-btn" :disabled="currentPage === 1">Prev</button>
    <ul class="buttons">
      <li @click="goToPage(buttonValue)" v-for="buttonValue in buttonsValues" :key="buttonValue" 
      :class="{ 'active-button': buttonValue === currentPage }">{{ buttonValue }}</li>
    </ul>
    <button @click="nextPage" class="next-btn" :disabled="currentPage === pageCount">Next</button>
  </div>
</template>

<script>
export default {
  props: {
    pageCount: Number
  },
  data() {
    return {
      currentPage: 1,
      buttonsValues: []
    }
  },
  methods: {
    calculateValuesOfButtons() {
      const maxButtons = 5
      this.buttonsValues = []

      if (this.pageCount <= maxButtons) {
        for (let x = 1; x <= this.pageCount; x++) {
          this.buttonsValues.push(x)
        }
      } else if (this.pageCount > maxButtons && this.currentPage === 1) {
        for (let x = 1; x <= maxButtons; x++) {
          this.buttonsValues.push(x)
        }
      } else if (this.pageCount > maxButtons && this.currentPage !== 1) {
        this.buttonsValues.push(1)
        this.buttonsValues.push(this.currentPage)
        for (let x = this.currentPage + 1; x <= this.currentPage + 3 && x <= this.pageCount; x++) {
          this.buttonsValues.push(x)
        }
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.$emit('changePage', this.currentPage)
        this.scrollToTop();
      }
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++
        this.$emit('changePage', this.currentPage)
        this.scrollToTop();
      }
    },
    goToPage(page) {
      this.currentPage = page
      this.$emit('changePage', this.currentPage)
      this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
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
  background: linear-gradient(270deg, #90cea1 0%, #01b4e4 100%);
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
.prev-btn:disabled,
.next-btn:disabled {
  cursor: not-allowed;
  pointer-events: none;
}
</style>