<template>
    <div class="p-component">
        <!-- <h2>Dashboard</h2> -->
        <h3>Пользователь</h3>
        <!-- <p>Имя: {{ data.user.name }}</p> -->
    </div>
</template>
<script>
    // import axios from "axios"
    // import router from "../router"
	// import { reactive } from "vue"
    // import { unref } from "vue"
    import {onBeforeMount} from 'vue';
    import { inject } from "vue";
    export default {
        setup() {
            // const datum = reactive({
            //   title: "Hello, Vue 3"
            // });
            //
            // return { datum };

            onBeforeMount(async() => {
            const store = inject("store");
                await store.backend.getUser();
                // console.log("user", unref(data));
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
