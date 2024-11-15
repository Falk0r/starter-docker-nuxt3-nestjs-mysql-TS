<template>
  <div class="bg-white p-8 rounded shadow-md max-w-md w-full mx-auto">
    <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">
      {{ $t("login.title") }}
    </h1>
    <form @keypress.enter="signInWithCredentials">
      <div class="mb-4">
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ $t("login.email") }}
        </label>
        <InputText
          v-model="email"
          type="email"
          class="w-full"
          :invalid="errors.email"
        />
        <small
          v-if="errors.email"
          id="username-help"
          class="text-red-500"
        >
          {{ $t("login.invalid.email") }}
        </small>
      </div>
      <div class="mb-4">
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ $t("login.password") }}
        </label>
        <InputText
          v-model="password"
          type="password"
          class="w-full"
          :invalid="errors.password"
        />
        <small
          v-if="errors.password"
          id="username-help"
          class="text-red-500"
        >
          {{ $t("login.invalid.password") }}
        </small>
        <!-- <a
          href="#"
          class="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Forgot Password?
        </a> -->
      </div>
      <div class="flex items-center justify-between mb-4">
        <NuxtLink
          :to="localePath('/register')"
          class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ $t("register.title") }}
        </NuxtLink>
      </div>

      <Button
        :loading="loading"
        :label="$t('login.title')"
        class="w-full"
        @click="signInWithCredentials"
      />
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "login",
  auth: {
    unauthenticatedOnly: true,
  },
});
const email = ref("test1@test.com");
const password = ref("Aoq8Kg43Ks2$tdkmfE");
const loading = ref(false);

const errors = ref({
  email: false,
  password: false,
});

const localePath = useLocalePath();
const { signIn } = useAuth();
const toast = useToast();
const { t } = useI18n();

async function signInWithCredentials() {
  errors.value.email = false;
  errors.value.password = false;

  loading.value = true;

  try {
    if (!email.value) {
      errors.value.email = true;
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email.value)) {
        errors.value.email = true;
      }
    }
    if (!password.value) {
      errors.value.password = true;
    }

    if (errors.value.email || errors.value.password) {
      return;
    }

    const credentials = {
      email: email.value,
      password: password.value,
    };

    await signIn(credentials, { callbackUrl: localePath("/protected") });
  } catch (error) {
    const message = t(error.statusMessage) ?? t("api.CodeError.500");
    toast.add({
      severity: "error",
      summary: t("toast.error"),
      detail: message,
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
}
</script>
