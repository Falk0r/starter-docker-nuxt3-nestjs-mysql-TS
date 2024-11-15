<template>
  <div>
    <h1>Dashboard</h1>
    <div v-if="users">
      <div
        v-for="user in users"
        :key="user.id"
      >
        {{ user.firstName }} : {{ user.email }}
      </div>
    </div>

    <div v-if="session">
      <h1>User connected :</h1>
      <p>{{ session.user.firstName }}</p>
      <p>{{ session.user.lastName }}</p>
    </div>

    <Button
      :label="$t('login.signOut')"
      severity="danger"
      @click="signOut({ callbackUrl: '/' })"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "applications",
  middleware: "auth",
});
const { signOut, data: session } = useAuth();

interface User {
  id: number;
  firstName: string;
  email: string;
}

// const { data: users } = await useApiFetch<User[]>("users");
</script>
