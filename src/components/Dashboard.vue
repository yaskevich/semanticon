<template>
    <div class="p-component">
        <!-- <h2>Dashboard</h2> -->
        <h3>Пользователь</h3>
        <!-- <p>Имя: {{ data.user.name }}</p> -->
    </div>
</template>
<script>
    import { onBeforeMount } from 'vue';
    import { inject } from "vue";
    export default {
        setup() {
            onBeforeMount(async() => {
            const store = inject("store");
                await store.backend.getUser();
            });
            return { }
          },
        name: "Login",
        data() {
            return {
                user: {
                    name: "Jesse"
                }
            }
        },

        mounted() {
            console.log("dashboard mounted");
        }
    }
</script>
