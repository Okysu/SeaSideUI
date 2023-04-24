import { useStyleTag, removeStyleTag } from '@/utils/style'

const styleTagRefCount = new Map()

const buttonId = 'ssui-button'

const buttonVariants: Record<string, any> = {
    default: {
        "--ssui-c1": "#f6d365",
        "--ssui-c2": "#fda085",
    },
    primary: {
        "--ssui-c1": "#fbc2eb",
        "--ssui-c2": "#a6c1ee",
    },
    info: {
        "--ssui-c1": "#a1c4fd",
        "--ssui-c2": "#c2e9fb",
    },
    success: {
        "--ssui-c1": "#84fab0",
        "--ssui-c2": "#8fd3f4",
    },
    warning: {
        "--ssui-c1": "#ffecd2",
        "--ssui-c2": "#fcb69f",
    },
    error: {
        "--ssui-c1": "#ff9a9e",
        "--ssui-c2": "#fad0c4",
    },
    outlined: {
        backgroundColor: "transparent !important",
        border: "2px solid var(--ssui-c1) !important",
        pseudoClasses: {
            disabled: {
                border: "2px solid var(--ssui-c1) !important",
            },
        },
    },
    text: {
        background: "transparent !important",
        color: "var(--ssui-c1) !important",
        boxShadow: "none !important",
        border: "2px solid transparent !important",
        pseudoClasses: {
            hover: {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
            disabled: {
                color: "var(--ssui-c1) !important",
            },
        },
    },
    ghost: {
        color: "var(--ssui-c1) !important",
        background: "transparent !important",
        border: "2px solid rgba(0, 0, 0, 0.2)",
        pseudoClasses: {
            hover: {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
            disabled: {
                color: "var(--ssui-c1) !important",
            },
        },
    },
    block: {
        width: "100%",
    }
}




export const useButtonStyles = (variant: string) => {
    const styles = buttonVariants[variant] || buttonVariants.default
    const className = `ssui-button-${variant}`
    const styleTagId = useStyleTag({ styles, className, pseudoClasses: styles.pseudoClasses, id: buttonId })

    if (styleTagRefCount.has(styleTagId)) {
        styleTagRefCount.set(styleTagId, styleTagRefCount.get(styleTagId) + 1)
    } else {
        styleTagRefCount.set(styleTagId, 1)
    }

    return { styleTagId, className }
}

export const releaseButtonStyles = (styleTagId: string) => {
    if (styleTagRefCount.has(styleTagId)) {
        const count = styleTagRefCount.get(styleTagId) - 1

        if (count === 0) {
            removeStyleTag(styleTagId)
            styleTagRefCount.delete(styleTagId)
        } else {
            styleTagRefCount.set(styleTagId, count)
        }
    }
}
