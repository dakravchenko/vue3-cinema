<template>
    <div class="error-container" v-if="error">
        <h2>{{ error }}</h2>
    </div>
</template>

<script>
export default {
    props: {
        error: String
    }
}
</script>

<style>
.error-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #b9b4b4;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 0 10px rgba(232, 216, 216, 0.3);
}

.error-container h2 {
  color: #082529;
}
</style>