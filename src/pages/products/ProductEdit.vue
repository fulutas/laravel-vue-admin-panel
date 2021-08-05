<template>
<div>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label>Title</label>
      <input v-model="data.title" class="form-control" name="title">
    </div>
    <div class="mb-3">
      <label>Description</label>
      <textarea v-model="data.description" class="form-control" name="description"></textarea>
    </div>
    <div class="mb-3">
      <label>Image</label>
      <div class="input-group">
        <input v-model="data.image" class="form-control" name="image" placeholder="Choose image or add link..">
        <ImageUpload @uploaded="data.image = $event"/>
      </div>
    </div>
    <div class="mb-3">
      <label>Price</label>
      <input v-model="data.price" type="number" class="form-control" name="price">
    </div>
    <button class="btn btn-success">Save</button>
  </form>

<div class="image mt-3">
<h3 class="title">Image</h3>
  <div class="card">
    <div class="card-body">
        <img :src="data.image" alt="">
    </div>
  </div>
</div>

</div>
</template>

<script lang="ts">
import { onMounted, reactive } from "vue"
import axios from 'axios';
import {useRoute, useRouter} from "vue-router";
import ImageUpload from "@/components/ImageUpload.vue"

export default {
  name: "ProductEdit",
  components: {ImageUpload},
  setup() {

    const router = useRouter();
    const route = useRoute()

    const data = reactive({
      title: '',
      description: '',
      image: '',
      price: ''
    });

    onMounted(async () => {
      const response = await axios.get(`products/${route.params.id}`);
      
      data.title = response.data.title;
      data.description = response.data.description;
      data.image = response.data.image;
      data.price = response.data.price;

    });

    const submit = async () => {
      await axios.put(`products/${route.params.id}`, data);
      await router.push('/products');
    }

    return {
      data,
      submit
    }
  }
}
</script>