<template>
    <div class="p-component">
        <h2>Login</h2>
        <!-- <Button label="ok" class="p-button-link" @click="say()" /> -->
        <form v-on:submit="login">
            <input type="text" name="email" /><br>
            <input type="password" name="password" /><br>
            <input type="submit" value="Login" />
        </form>
    </div>
</template>

<script>
    import store from "@/modules/store";
    // import store from "@/modules/store";
    export default {
        name: "Login",
        // watch: {
        //  '$route': 'isLog()'
        // },
       setup() {
           // return {
           //     say: () => store.actions.add("hehe")
           // }
       },
        methods: {
            login: (e) => {
                e.preventDefault()
                let email = "user@email.com"
                let password = "password"
                store.backend.doLogin(email, password);
            },
        },  computed: {
          isLog() {
            console.log("is Logged check!");
            return store.actions.isAuth();
          }
        }
    }
</script>
