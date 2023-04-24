<template>
    <div class="ssui-content-layer" :class="contentClass" :style="contentStyle">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        contentClass: {
            type: String,
            default: "",
        },
        contentStyle: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style scoped>
.ssui-content-layer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
</style>