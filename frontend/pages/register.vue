<template>
  <div class="bg-white p-8 rounded shadow-md max-w-md w-full mx-auto">
    <h2 class="text-2xl font-bold text-center mb-4 dark:text-gray-500">
      {{ $t("register.title") }}
    </h2>

    <form
      action="#"
      method="POST"
    >
      <!-- Adresse email -->
      <div class="mt-4">
        <label
          for="email"
          class="block text-sm font-medium text-gray-700"
        >
          {{ $t("register.email") }}
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
          {{ $t("register.invalid.email") }}
        </small>
      </div>

      <!-- FirstName -->
      <div class="mt-4">
        <label
          for="email"
          class="block text-sm font-medium text-gray-700"
        >
          {{ $t("register.firstName") }}
        </label>
        <InputText
          v-model="firstName"
          type="firstName"
          class="w-full"
          :invalid="errors.firstName"
        />
        <small
          v-if="errors.firstName"
          id="username-help"
          class="text-red-500"
        >
          {{ $t("register.invalid.firstName") }}
        </small>
      </div>

      <!-- lastName -->
      <div class="mt-4">
        <label
          for="lastName"
          class="block text-sm font-medium text-gray-700"
        >
          {{ $t("register.lastName") }}
        </label>
        <InputText
          v-model="lastName"
          type="lastName"
          class="w-full"
          :invalid="errors.lastName"
        />
        <small
          v-if="errors.lastName"
          id="username-help"
          class="text-red-500"
        >
          {{ $t("register.invalid.lastName") }}
        </small>
      </div>

      <!-- Mot de passe -->
      <div class="mt-4">
        <label
          for="password"
          class="block text-sm font-medium text-gray-700"
        >
          {{ $t("register.password") }}
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
          {{ $t("register.invalid.password") }}
        </small>
      </div>

      <div class="flex items-center justify-between mt-4">
        <NuxtLink
          :to="localePath('/login')"
          class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ $t("login.title") }}
        </NuxtLink>
      </div>

      <!-- Bouton d'inscription -->
      <div class="mt-6">
        <Button
          :loading="loading"
          :label="$t('register.submit')"
          class="w-full"
          @click.prevent="registerWithCredentials()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "login",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const loading = ref(false);

const errors = ref({
  email: false,
  password: false,
});

const localePath = useLocalePath();
const { signUp } = useAuth();
const toast = useToast();
const { t } = useI18n();

async function registerWithCredentials() {
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

    if (!firstName.value) {
      errors.value.firstName = true;
    }

    if (!lastName.value) {
      errors.value.lastName = true;
    }

    if (errors.value.email || errors.value.password) {
      return;
    }

    const credentials = {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
    };

    await signUp(credentials, { callbackUrl: localePath("/protected") });
  } catch (error) {
    const message = t(error?.data?.message) ?? t("api.CodeError.500");
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
