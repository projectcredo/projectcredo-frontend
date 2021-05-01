<template>
  <div class="container text-center mt-28">
    <h1>{{ error.statusCode }}</h1>
    <h1 v-if="error.statusCode === 404">
      Page not found
    </h1>
    <h1 v-else>
      An error occurred
    </h1>
    <NuxtLink to="/" class="mt-5 inline-block">
      Go to Home page
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    error: { type: Object, required: true },
  }, // you can set a custom layout for the error page
}
</script>
