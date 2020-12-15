<template>
    <div class="p-component">
        <h2>Login</h2>
        <form v-on:submit="login">
            <input type="text" name="email" /><br>
            <input type="password" name="password" /><br>
            <input type="submit" value="Login" />
        </form>
    </div>
</template>

<script>
    import queryLibrary from "../modules/queries";
    export default {
        name: "Login",
        methods: {
            login: (e) => {
                e.preventDefault()
                const { doLogin } = queryLibrary();
                let email = "user@email.com"
                let password = "password"
                doLogin(email, password);
                // login();
            }
        }
    }
</script>
