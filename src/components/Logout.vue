<template>
  Logout
</template>

<script>
import store from "../store";

export default {
  name: "Logout",
  setup() {
    store.backend.doLogout();
    // router.push("/")
  }
}
</script>
