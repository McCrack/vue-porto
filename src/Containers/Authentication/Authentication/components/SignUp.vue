<template>
    <form>
        <h1>{{ $t('page.sign_up') }}</h1>
        <g-input v-bind:placeholder="$t('base.first_name')"/>
        <g-input v-bind:placeholder="$t('base.last_name')"/>
        <g-input v-bind:placeholder="$t('base.phone')" type="tel"/>
        <g-input placeholder="E-mail" type="email"/>
        <g-input v-bind:placeholder="$t('base.password')"/>
        <g-input v-bind:placeholder="$t('base.confirm_password')"/>
        <g-button>{{ $t('base.sign_up') }}</g-button>
    </form>
</template>

<script>
export default {
    name: "SignUp"
}
</script>

<style lang="scss" scoped>
button {
    width: 120px;
    text-transform: uppercase;
    background-color: var(--login-btn-color, $login-btn-color);
}
</style>