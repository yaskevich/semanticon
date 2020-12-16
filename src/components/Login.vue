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
    import queryLibrary from "../modules/queries";
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
                const { doLogin } = queryLibrary();
                let email = "user@email.com"
                let password = "password"
                doLogin(email, password);
                // login();
            },
        },  computed: {
          isLog() {
            const { isLoaded } = queryLibrary();
            console.log("!!!!");
            return Boolean(Reflect.getOwnPropertyDescriptor(isLoaded.value, "user"));
          }
        }
    }
</script>
