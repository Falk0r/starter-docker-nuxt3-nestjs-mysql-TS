<template>
  <!-- component -->
  <div
    class="flex flex-col space-y-8 min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-gray-100 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75"
  >
    <div class="block rounded-lg bg-white w-72 mt-32">
      <div class="relative overflow-hidden bg-cover bg-no-repeat">
        <img
          class="rounded-t-lg sm:m-h-64 md:h-64 w-full"
          src="https://cordis.europa.eu/docs/results/images/2020-05/417980.jpg"
          alt=""
        >
      </div>

      <div class="p-4 dark:bg-gray-200">
        <p class="mb-4 text-base text-neutral-600 dark:text-neutral-900">
          {{ $t("page.protected.content") }}
        </p>
        <div class="flex justify-between">
          <Button
            :label="$t('login.signOut')"
            severity="danger"
            @click="signOut({ callbackUrl: '/' })"
          />
          <NuxtLink :to="localePath('/')">
            <Button
              severity="secondary"
              :label="$t('home')"
            />
          </NuxtLink>

          <NuxtLink :to="localePath('/dashboard')">
            <Button
              severity="secondary"
              :label="$t('dashboard')"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signOut } = useAuth();
const localePath = useLocalePath();
definePageMeta({
  layout: "applications",
  middleware: "auth",
});
</script>
