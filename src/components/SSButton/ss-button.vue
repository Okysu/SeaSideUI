<template>
    <base-button :class="[containerClass, ...globalClass]">
        <state-layer :class="[stateClass, ...globalClass]">
            <content-layer :class="[contentClass, ...globalClass]">
                <ss-ripple>
                    <button :class="['ssui-button', buttonClass, customClass]" :style="customStyle" :disabled="disabled">
                        <slot></slot>
                    </button>
                </ss-ripple>
            </content-layer>
        </state-layer>
    </base-button>
</template>


<script lang="ts">
import { defineComponent, onUnmounted } from "vue"
import { useButtonStyles, releaseButtonStyles } from "./ss-button.styles"

import BaseButton from "./ss-base-container.vue"
import StateLayer from "../SSLayer/ss-state-layer.vue"
import ContentLayer from "../SSLayer/ss-content-layer.vue"

import SsRipple from "../SSRipple/ss-ripple.vue"

export default defineComponent({
    name: "SsButton",
    components: {
        BaseButton,
        StateLayer,
        ContentLayer,
        SsRipple,
    },
    props: {
        type: {
            type: String,
            default: "default",
            validator: (value: string) => {
                return ["default", "tertiary", "primary", "info", "success", "warning", "error"].includes(value)
            },
        },
        customClass: {
            type: String,
            default: "",
        },
        customStyle: {
            type: Object,
            default: () => ({}),
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        block: {
            type: Boolean,
            default: false,
        },
        secondary: {
            type: Boolean,
            default: false,
        },
        text: {
            type: Boolean,
            default: false,
        },
        outlined: {
            type: Boolean,
            default: false,
        },
        ghost: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        containerClass() {
            return ""
        },
        stateClass() {
            return ""
        },
        contentClass() {
            return ""
        },
    },
    setup(props) {
        const styleIdSet = new Set<string>()

        const { styleTagId, className } = useButtonStyles(props.type)
        const buttonClass = []
        buttonClass.push(className)
        styleIdSet.add(styleTagId)

        const globalClass = []

        if (props.block) {
            const { styleTagId, className } = useButtonStyles("block")
            buttonClass.push(className)
            globalClass.push(className)
            styleIdSet.add(styleTagId)
        }

        if (props.secondary) {
            const { styleTagId, className } = useButtonStyles("secondary")
            buttonClass.push(className)
            styleIdSet.add(styleTagId)
        }

        if (props.text) {
            const { styleTagId, className } = useButtonStyles("text")
            buttonClass.push(className)
            styleIdSet.add(styleTagId)
        }

        if (props.outlined) {
            const { styleTagId, className } = useButtonStyles("outlined")
            buttonClass.push(className)
            styleIdSet.add(styleTagId)
        }

        if (props.ghost) {
            const { styleTagId, className } = useButtonStyles("ghost")
            buttonClass.push(className)
            styleIdSet.add(styleTagId)
        }

        onUnmounted(() => {
            styleIdSet.forEach((styleId) => {
                releaseButtonStyles(styleId)
            })
        })

        return {
            buttonClass,
            globalClass,
        }
    },
})
</script>

<style scoped>
.ssui-button {
    position: relative;
    flex: 1 1 auto;
    padding: 0.8em 1em;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background: linear-gradient(90deg, var(--ssui-c1, #f6d365), var(--ssui-c2, #fda085) 51%, var(--ssui-c1, #f6d365)) var(--ssui-x, 0)/ 200%;
    color: white;
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    border: 2px solid transparent;
}

.ssui-button::before {
    content: "";
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
    background: inherit;
    border-radius: inherit;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.5s;
}

.ssui-button:focus::before {
    opacity: 1;
}

.ssui-button:not(:disabled):hover {
    --ssui-x: 100%;
}

.ssui-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: brightness(0.88);
}

.ssui-button:not(:disabled):active {
    transform: scale(0.90);
}

.ssui-button:focus {
    outline: none;
}
</style>



