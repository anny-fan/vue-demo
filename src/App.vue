<template>
  <div class="container">
    <div class="alert row">
      <h3>select news category</h3>
      <select class="form-select" v-model="section">
        <option v-for="(section, i) in sections" :key="i" :value="section">
          {{ section }}
        </option>
      </select>
    </div>

    <div class="row g-2" v-for="(posts, i) in results" :key="i">
      <div class="col-3 p-2" v-for="(post, j) in posts" :key="j">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.abstract }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import data from "@/db.json";

export default {
  name: "App",
  setup() {
    const posts = ref(data);
    const SECTIONS_TW = "travel, health, tech";
    const section = ref("tech");
    const sections = SECTIONS_TW.split(", ");

    const results = computed(() => {
      console.log(
        "filter after slice",
        posts.value.filter((post) => post.category === section.value)
      );
      let filteredPosts = posts.value.filter(
        (post) => post.category === section.value
      );
      let chunkedArray = [];
      const chunk = 4;
      for (let i = 0, j = 0; i < filteredPosts.length; i += chunk, j++) {
        chunkedArray[j] = filteredPosts.slice(i, i + chunk);
        console.log(chunkedArray[j]);
      }
      console.log("after for", chunkedArray);
      return chunkedArray;
    });

    return {
      posts,
      sections,
      section,
      results,
    };
  },
};
</script>
