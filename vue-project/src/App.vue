<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" />
    <button @click="sendImage" :disabled="!selectedFile">Send</button>
    <div v-if="prediction" class="prediction-result">
      <p>Prediction: {{ prediction }}</p>
      <img :src="imageUrl" alt="Uploaded Image" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
      prediction: null,
      imageUrl: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.imageUrl = URL.createObjectURL(this.selectedFile);
    },
    sendImage() {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      fetch('http://localhost:3000/predict', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          this.prediction = data.prediction;
        })
        .catch((error) => {
          console.error('Prediction error:', error);
        });
    },
  },
};
</script>

<style>
.prediction-result {
  margin-top: 20px;
}
</style>