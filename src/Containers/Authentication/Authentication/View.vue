<template>
    <div class="wrapper">
        <div class="cover">
            <img src="@assets/img/logo.svg" alt="LOGO">
        </div>
        <div class="form">
            <component v-bind:is="$route.name"/>
        </div>
    </div>
</template>

<script>

import { useAuthenticationComponents } from '@/Containers/Authentication/Authentication';

export default {
    name: "Authentication",
    components: {
        ...useAuthenticationComponents()
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
    height: 100vh;
    display: flex;
    align-items: stretch;
    & > .cover {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: var(--primary, $primary);
    }
    & > .form {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
@media (orientation: landscape) {
    .wrapper {
        & > .cover {
            width: 100%;
            height: 100vh;
            border-radius: 0 100px 100px 0;
            & > img {
                width: 260px;
            }
        }
        & > .form {
            width: 100%;
        }
    }
}

@media (orientation: portrait) {
    .wrapper {
        flex-direction: column-reverse;
        & > .cover {
            padding: 40px 0;
            border-radius: 60px 60px 0 0;
            & > img {
                width: 140px;
            }
        }
        & > .form {
            height: 100%;
        }
    }
}
</style>