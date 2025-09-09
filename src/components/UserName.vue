<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';

export interface UserNameProps {
  name: string;
}

const props = defineProps<UserNameProps>();
const emit = defineEmits<{ 'update:name': [string] }>();

const editing = ref(false);
const temp = ref(props.name);
const inputRef = ref<HTMLInputElement | null>(null);

watch(
  () => props.name,
  (val) => {
    if (!editing.value) {
      temp.value = val;
    }
  },
);

function onStartEditing() {
  temp.value = props.name;
  editing.value = true;
}

function onCommitName() {
  const newName = temp.value.trim();
  // Keep editing active if the name is empty
  if (!newName) {
    return;
  }

  emit('update:name', newName);
  editing.value = false;
}

function onCancelEditing() {
  editing.value = false;
}

onMounted(async () => {
  if (!props.name.trim()) {
    editing.value = true;

    await nextTick();
    inputRef.value?.focus();
  }
});
</script>

<template>
  <template v-if="!editing">
    <span
      aria-label="Edit your name"
      role="button"
      tabindex="0"
      class="cursor-pointer rounded px-1 align-baseline underline-offset-4 hover:underline focus:ring-2 focus:ring-wx-amber-100 focus:outline-none"
      @click="onStartEditing"
      @keydown.enter.prevent="onStartEditing"
      @keydown.space.prevent="onStartEditing"
    >
      {{ props.name }}
    </span>
  </template>
  <template v-else>
    <input
      ref="inputRef"
      v-model="temp"
      aria-label="Your name"
      class="w-40 border-b border-wx-gray-300 bg-wx-amber-100 px-1 focus:border-wx-amber-100 focus:outline-none sm:w-64"
      @blur="onCommitName"
      @keydown.enter.prevent="onCommitName"
      @keydown.esc.prevent="onCancelEditing"
    />
  </template>
</template>
