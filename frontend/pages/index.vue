<template>
  <div>
    <h1 class="font-bold text-teal-700">Home Page</h1>
    <p>Count: {{ double }}</p>
    <p v-show="sayHello">{{ sayHello }}</p>
  </div>
</template>

<script setup lang="ts">
const count = ref(1);
const double = computed(() => count.value * 2);
const {data: sayHello} = await useFetch("http://localhost:3500");

definePageMeta({
  layout: "application",
  name: "home",
  auth: {
    unauthenticatedOnly: false,
  },
});
</script>
