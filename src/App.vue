<template>
  <div class="container pb-5 pt-3">
    <!-- news select -->
    <div class="section">
      <h1 class="display-4">News</h1>
      <div class="alert alert-dark row">
        <h3>select news category</h3>
        <select class="form-select" v-model="section">
          <option v-for="(section, i) in sections" :key="i" :value="section">
            {{ section }}
          </option>
        </select>
      </div>
      <div class="row g-2" v-for="(posts, i) of results" :key="i">
        <div class="col-3 p-2" v-for="(post, i) of posts" :key="i">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.abstract }}</p>
            </div>
            <div class="card-footer text-body-secondary">#{{ section }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 記事本 -->
    <div class="section">
      <h1 class="display-4">Simple Notes</h1>
      <p class="lead">左側新增、右側顯示及刪除</p>
      <div class="row">
        <div class="col-4">
          <div class="card text-center">
            <div class="card-header">
              <h3>Add Note</h3>
            </div>
            <div class="card-body">
              <div class="input-group mb-3">
                <span class="input-group-text">title</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入記事摘要"
                  v-model="newNote.title"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">content</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入記事內容"
                  v-model="newNote.content"
                />
              </div>
              <a href="#" class="btn btn-primary" @click.prevent="addNote"
                >Add</a
              >
            </div>
          </div>
        </div>
        <div class="col">
          <table class="table table-striped">
            <thead class="table-light">
              <tr class="text-center">
                <th>title</th>
                <th>content</th>
                <th>edit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="note of notes">
                <td>{{ note.title }}</td>
                <td>{{ note.content }}</td>
                <td class="text-center">
                  <button
                    class="btn btn-danger btn-sm rounded-circle"
                    @click="deleteNote(note)"
                  >
                    X
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- todo -->
    <div class="section">
      <TodoList></TodoList>
    </div>

    <!-- data table -->
    <div class="section">
      <h2 class="display-4">Filter/Sort Data</h2>
      <div class="row mb-3">
        <label for="searchField" class="col-form-label col-sm-2"
          >Search Field:</label
        >
        <div class="col-sm-6">
          <input id="searchField" v-model="searchInput" />
        </div>
      </div>
      <DataTable
        :entries="dataset"
        :columns="dataColumns"
        :filter-key="searchInput"
      ></DataTable>
    </div>
  </div>
  <Modal
    :show="showModal"
    @close="showModal = false"
    @confirm="confirmDeleteNote"
  >
    <template #header>Are you sure?</template>
    Delete this note.
    <!-- $emit無法在這邊用 -->
    <!-- <template #footer></template> -->
  </Modal>
</template>

<script setup>
import { computed, watch } from "vue";
import data from "@/db.json";
import TodoList from "@/components/TodoList.vue";
import DataTable from "@/components/DataTable.vue";
import Modal from "@/components/Modal.vue";

const posts = $ref(data);
const SECTIONS_TW = "travel, health, tech";
const section = $ref("tech");
const sections = SECTIONS_TW.split(", ");
const newNote = $ref({
  title: "",
  content: "",
});
const notes = $ref(JSON.parse(localStorage.getItem("notes")) || []);
let showModal = $ref(false);
let noteToDelete;

const results = computed(() => {
  const filteredPosts = posts.filter((post) => post.category === section);
  let chunkedArray = [];
  const chunk = 4;
  for (let i = 0, j = 0; i < filteredPosts.length; i += chunk, j++) {
    chunkedArray[j] = filteredPosts.slice(i, i + chunk);
  }
  return chunkedArray;
});

function addNote() {
  if (newNote.title.trim().length == 0 || newNote.content.trim().length == 0) {
    alert("輸入不能為空");
    return;
  }
  const note = {
    title: newNote.title,
    content: newNote.content,
    created: new Date(),
  };
  notes.push(note);
  newNote.content = "";
  newNote.title = "";
}

function deleteNote(note) {
  showModal = true;

  // Set the note to be deleted
  noteToDelete = note;
}

function confirmDeleteNote() {
  const ndx = notes.indexOf(noteToDelete);
  if (ndx !== -1) {
    notes.splice(ndx, 1);
  }
  showModal = false;
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

watch(
  () => notes,
  () => {
    saveNotes();
  },
  { deep: true }
);

const searchInput = $ref("");
const dataColumns = $ref(["title", "abstract", "category"]);
const dataset = $ref(data);
</script>
<style scoped>
.input-group-text {
  min-width: 5rem;
  justify-content: flex-end;
}
</style>
