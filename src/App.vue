<script setup lang="ts">
import SsButton from "@/components/SSButton/ss-button.vue"
import SsSpace from "@/components/SSSpace/ss-space.vue"
</script>

<template>
    <ss-space>
        <ss-button>
            <span>Default</span>
        </ss-button>
        
        <ss-button ghost>
            <span>Ghost</span>
        </ss-button>

        <ss-button text>
            <span>Text</span>
        </ss-button>

        <ss-button type="primary">
            Primary
        </ss-button>

        <ss-button type="tertiary">
            <span>Tertiary</span>
        </ss-button>

        <ss-button type="info">
            <span>Info</span>
        </ss-button>

        <ss-button type="success">
            <span>Success</span>
        </ss-button>

        <ss-button type="success" ghost>
            <span>Success + Ghost</span>
        </ss-button>

        <ss-button type="warning">
            <span>Warning</span>
        </ss-button>

        <ss-button type="warning" ghost outlined>
            <span>Warning + Ghost + Outlined</span>
        </ss-button>

        <ss-button type="error">
            <span>Error</span>
        </ss-button>


        <ss-button type="error" outlined>
            <span>Error + Outlined</span>
        </ss-button>

        <ss-button type="error" outlined disabled>
            <span>Error + Outlined + Disabled</span>
        </ss-button>

        <ss-button type="primary" disabled>
            <span>Disabled</span>
        </ss-button>

        <ss-button disabled text>
            <span>Text + Disabled</span>
        </ss-button>

        <ss-button type="primary" disabled block>
            <span>Disabled + Block</span>
        </ss-button>

        <ss-button type="primary" block>
            <span>Primary + Block</span>
        </ss-button>
    </ss-space>
</template>