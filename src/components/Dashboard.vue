<template>
    <div class="p-component">
        <!-- <h2>Dashboard</h2> -->
        <h3>Пользователь</h3>
        <p>Имя: {{ data.user.name }}</p>
    </div>
</template>
<script>
import queryLibrary from "../modules/queries";
    // import axios from "axios"
    // import router from "../router"
	// import { reactive } from "vue"
    // import { unref } from "vue"
    export default {
        setup() {
            // const datum = reactive({
            //   title: "Hello, Vue 3"
            // });
            //
            // return { datum };
            const { data, getUser } = queryLibrary();
            getUser();
            // console.log("user", unref(data));
            return { data }
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
