<template>
  <Dropdown
    v-model="selectedCountry"
    :options="locales"
    option-label="name"
    placeholder="Select a Country"
    class="w-full md:w-[14rem]"
    @change="switchLocalCountry"
  />
</template>

<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath();
const { locale, locales } = useI18n();

const selectedCountry = ref(getLocalCountry());

function getLocalCountry() {
  return locales.value.find(country => country.code === locale.value);
}

function switchLocalCountry(country: { value: { code: string } }) {
  navigateTo(switchLocalePath(country.value.code));
}
</script>
