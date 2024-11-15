<template>
  <div>
    <h1>About Page</h1>
    <p>{{ message }}</p>
    <h2>{{ $t("welcome") }}</h2>
    <div>
      <br>
      <NuxtLink :to="localePath('/')">
        {{ $t("home") }}
      </NuxtLink>
    </div>
    <div class="card flex justify-center">
      <I18nSwitchLang />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "applications",
  auth: false,
});
const localePath = useLocalePath();

const message = ref("This is the about page of our application.");
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
