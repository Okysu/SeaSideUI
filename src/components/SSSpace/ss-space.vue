<template>
    <div class="ssui-space" :class="directionClass" :style="{ '--ssui-space-spacing': spacing }">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
    name: "SsSpace",
    props: {
        spacing: {
            type: String,
            default: "8px",
        },
        vertical: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const directionClass = computed(() => {
            return props.vertical ? "ssui-space--vertical" : "ssui-space--horizontal";
        });

        return {
            directionClass,
        };
    },
});
</script>

<style scoped>
.ssui-space {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ssui-space-spacing);
    align-items: flex-start;
}

.ssui-space--vertical {
    flex-direction: column;
}

.ssui-space--horizontal {
    flex-direction: row;
}
</style>
