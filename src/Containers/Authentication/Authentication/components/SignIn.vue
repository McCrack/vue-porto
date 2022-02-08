<template>
    <form v-on:submit.prevent="signIn">
        <h1>{{ $t('page.sign_in') }}</h1>
        <g-input name="email"
                 type="email"
                 placeholder="E-mail"/>
        <g-input name="password"
                 type="password"
                 v-bind:placeholder="$t('base.password')"/>
        <div>
            <router-link to="/reset-password">{{ $t('base.forgot_password') }}</router-link>
        </div>
        <g-button>{{ $t('base.sign_in') }}</g-button>
    </form>
</template>

<script>

import { ref } from 'vue';
import { useAuthenticationActions } from '@/Containers/Authentication/Authentication';

export default {
    name: "SignIn",

    setup() {
        const email = ref("");
        const password = ref("");

        const { signIn } = useAuthenticationActions();

        return {
            email,
            password,
            signIn,
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    width: 120px;
    text-transform: uppercase;
    background-color: var(--btn-color, $login-btn-color);
}
</style>