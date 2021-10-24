<template>
  <span>
    <span class="pointer" @click="toggleEditMode()">🖍</span>
    <div v-if="isEdit">
      <input type="text" v-model="editUserInput" @keydown="handleSubmit" />
    </div>
  </span>
</template>

<script>
export default {
  name: "TodoEditItem",
  props: {
    id: Number,
    content: String,
    onEdit: Function,
  },
  data() {
    return {
      isEdit: false,
      editUserInput: this.content,
    };
  },
  methods: {
    toggleEditMode() {
      this.isEdit = !this.isEdit;
    },
    handleSubmit(e) {
      if (e.key === "Enter" && this.editUserInput) {
        if (this.onEdit) {
          this.onEdit({ id: this.id, content: this.editUserInput });
        }
        this.toggleEditMode();
      }
    },
  },
};
</script>

<style scoped></style>
