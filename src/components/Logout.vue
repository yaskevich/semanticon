<template>
  Logout
</template>
<script>
import queryLibrary from "../modules/queries";
// import router from "../router"
export default {
    name: "Logout",
    setup() {
        const { doLogout } = queryLibrary();
        doLogout();
        // router.push("/")
    }
}
</script>
