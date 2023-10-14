<template>
  <div class="input-container">
    <input type="text" placeholder="Type to find..." v-model="query" @input="handleInput" />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(_, { emit }) {
    const query = ref('');

    const handleInput = () => {
      emit('update:query', query.value);
    };

    return { query, handleInput };
  },
};
</script>

<style>
.input-container {
  width: 30%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
}

.input-container input {
  width: 100%;
  padding: 20px;
  margin: 8px 0;
  border-width: thick;
  border-radius: 50px;
  margin-right: 20px;
}

input::placeholder {
  font-size: 20px;
  font-family: "Inter";
}

input {
  font-size: 20px;
  font-family: "Inter";
}
</style>