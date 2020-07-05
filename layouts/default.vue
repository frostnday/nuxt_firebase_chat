<template>
  <main class="container relative min-h-screen pt-16">
    <Header />
    <Alert />
    <nuxt />
  </main>
</template>
<script>
import Header from '~/components/Header'
import Alert from '~/components/Alert'

export default {
  components: {
    Header,
    Alert
  }
}
</script>
