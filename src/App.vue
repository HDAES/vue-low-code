<template>
  <Editor v-model="state" />
</template>

<script setup>
import { provide, ref } from "vue";
import Editor from "./packages/editor";
import data from "./data.json";
import { editorConfig } from "./utils/editor-config";
const state = ref(data);

provide("config", editorConfig);
</script>

<style>
#app {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
}
</style>
