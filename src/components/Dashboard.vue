<template>
    <div class="p-component">
        <!-- <h2>Dashboard</h2> -->
        <h3>Пользователь</h3>
        <p>Имя: {{ user.name }}</p>
    </div>
</template>
<script>
    import axios from "axios"
    import router from "../router"
	// import { reactive } from "vue"
    export default {
        setup() {
            // const datum = reactive({
            //   title: "Hello, Vue 3"
            // });
            //
            // return { datum };
          },
        name: "Login",
        data() {
            return {
                user: {
                    name: "Jesse"
                }
            }
        },
        methods: {
            getUserData: function() {
                let self = this
                axios.get("/api/user")
                    .then((response) => {
                        // console.log(response)
                        // console.log(self)
                        // self.$set(this, "user", response.data.user)
                        self.user = response.data.user
                    })
                    .catch((errors) => {
                        console.log(errors)
                        router.push("/")
                    })
            }
        },
        mounted() {
            this.getUserData()
        }
    }
</script>
