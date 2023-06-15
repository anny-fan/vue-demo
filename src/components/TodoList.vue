<template>
  <div class="section">
    <h1 class="display-4">Todo List</h1>
    <form class="row mb-3" @submit.prevent="addNewTask">
      <label for="todo" class="col-form-label col-sm-2">Add A New Task</label>
      <div class="col-sm-6">
        <input
          type="text"
          class="form-control"
          id="todo"
          placeholder="What's next?"
          v-model="newTask"
        />
      </div>
      <div class="col-sm-4">
        <button class="btn btn-primary">Add</button>
      </div>
    </form>
    <ul>
      <TodoItem
        v-for="(task, i) in tasks"
        :key="task.id"
        :title="task.title"
        @remove="tasks.splice(i, 1)"
      ></TodoItem>
    </ul>
  </div>
</template>

<script setup>
import TodoItem from "@/components/TodoItem.vue";
let newTask = $ref("");
const tasks = $ref([]);
let nextTaskId = $ref(1);

function addNewTask() {
  tasks.push({
    id: nextTaskId++,
    title: newTask,
  });
  newTask = "";
}
</script>

<style lang="scss" scoped></style>
