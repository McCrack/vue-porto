<template>
    <router-view v-bind:key="$route.fullPath"/>
    <component v-if="STATE.POPUP.SHOW && currModalComponent.trim() !== ''" v-bind:is="currModalComponent"/>
</template>

<script>

import { computed } from "vue"
import { STATE } from "@/Ship"
import { usePopUpComponents } from "./index";

export default {
    name: "App",
    components: {
        ...usePopUpComponents(),
    },
    setup() {
        const currModalComponent = computed(() => STATE.POPUP.NAME);
        return {
            STATE,
            currModalComponent,
        }
    }
}


</script>
<style lang="scss">

.wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    overflow: hidden;
    max-height: 100vh;
}

.main-container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    &-side-menu {
        height: 100%;
        width: 100%;
        z-index: 2;
        max-width: 38.9rem;
        position: relative;
        box-shadow: 0 0 4rem rgba(0, 0, 0, .5);
    }

    &-content {
        height: 100%;
        width: 80%;
        z-index: 1;
        position: relative;
        min-height: 100vh;
        max-height: 100vh;
        overflow-x: hidden;
        overflow-y: scroll;
        padding: 8rem 13rem 0 8rem;
        background: linear-gradient(240.56deg, #F5F5FD 0%, #EBEDF4 68.04%);
    }
}

::-webkit-scrollbar-thumb {
    background: #1A2030;

    &:hover {
        background: linear-gradient(180deg, #0026FF 0%, #0000F4 100%);
    }
}
</style>
