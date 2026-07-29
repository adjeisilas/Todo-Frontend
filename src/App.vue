<template>
  <!-- 
    <router-view> is a functional component that renders the matched component for the given path.
    Depending on the URL, it will render Signup.vue, Login.vue, or Todo.vue here.
  -->
  <router-view></router-view>
</template>

<script setup>
// No script logic is needed here for this setup since routing handles the display,
// and state is managed locally in the components/localStorage.
</script>

<style>
/* 
  Since you are using Tailwind CSS, you likely don't need global CSS here.
  Ensure your Tailwind base styles are imported in your main.js or a main.css file like:
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
*/
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>