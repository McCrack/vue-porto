<template>
    <div class="wrapper">
        <aside class="left-bar">

        </aside>
        <main>


        </main>
        <aside class="right-bar">

        </aside>
    </div>
</template>

<script>

import {STATE} from "@/Ship";
import { useRouter } from "vue-router";

export default {
    name: "Wallet",
    setup() {
        const router = useRouter();
        if (!STATE.IS_LOGIN) {
            router.push({name: 'SignIn'});
        }
    }
}
</script>

<style scoped>

</style>