<template>
    <div>
        <input v-bind:value="modelValue"
               v-on:input="inputEvent"
               v-bind="$attrs">
    </div>
</template>

<script>
export default {
    name: "GInput",
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup (props, { emit }) {
        const inputEvent = event => emit('update:modelValue', event.target.value);
        return {
            inputEvent
        }
    }
}
</script>

<style lang="scss" scoped>
input {
    margin: 5px 0;
    font-size: 13px;
    padding: 5px 10px;
    box-sizing: border-box;
    height: var(--input-height, $input-height);
    border: 1px solid var(--input-border, $input-border);
    border-radius: var(--input-rounding, $input-rounding);
}
</style>