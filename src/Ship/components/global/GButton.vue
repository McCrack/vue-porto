<template>
    <button><slot/></button>
</template>

<script>
export default {
    name: "GButton"
}
</script>

<style lang="scss" scoped>
button {
    color: white;
    border: none;
    font-size: 12px;
    cursor: pointer;
    font-weight: bold;
    height: var(--btn-height, $btn-height);
}
</style>