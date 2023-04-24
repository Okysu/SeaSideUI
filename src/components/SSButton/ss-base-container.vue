<template>
    <div class="ssui-base-button-container" :class="containerClass">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        containerClass: {
            type: String,
            default: "",
        },
    },
};
</script>

<style>
.ssui-base-button-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
</style>