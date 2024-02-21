<template>
  <div class="bg-gray-100 flex justify-center items-center h-screen">
    <!-- Left: Image -->
    <div class="w-1/2 h-screen hidden lg:block">
      <img
        src="https://www.cafedutrading.com/wp-content/uploads/2022/06/comment-trader-actions-US-swing-trading.jpg"
        alt="Placeholder Image"
        class="object-cover w-full h-full"
      />
    </div>
    <!-- Right: Login Form -->
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 class="text-2xl font-semibold mb-4">Login</h1>
      <div>
        <!-- Username Input -->
        <div class="mb-4">
          <label for="email" class="block text-gray-600">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            v-model="loginData.email"
          />
        </div>
        <!-- Password Input -->
        <div class="mb-4">
          <label for="password" class="block text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            v-model="loginData.password"
          />
        </div>
        <!-- Forgot Password Link -->
        <!-- <div class="mb-6 text-blue-500">
          <a href="#" class="hover:underline">Forgot Password?</a>
        </div> -->
        <!-- Login Button -->
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          @click="postLogin"
        >
          Login
        </button>
      </div>
      <!-- Sign up  Link -->
      <!-- <div class="mt-6 text-blue-500 text-center">
        <a href="#" class="hover:underline">Sign up Here</a>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "login",
  layout: "application",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
interface LoginData {
  email: string;
  password: string;
}

const loginData: LoginData = {
  email: "test1@test.com",
  password: "Aoq8Kg43Ks2$tdkmfE",
};

const {signIn} = useAuth();

const postLogin = async () => {
  await signIn(loginData, {callbackUrl: "/protected"});
};
</script>
