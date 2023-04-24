<template>
    <div class="ssui-state-layer" :class="stateClass" :style="stateStyle">
        <slot></slot>
    </div>
</template>

<script lang="ts">

export default {
    props: {
        stateClass: {
            type: String,
            default: "",
        },
        stateStyle: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style scoped>
.ssui-state-layer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
}
</style>