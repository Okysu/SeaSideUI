// Cache for storing style elements to avoid unnecessary DOM lookups
const styleTagCache = new Map();

export type UseStyleTagOptions = {
    id?: string; // If an ID is not provided, a random ID will be generated
    styles: StyleTag;
    className: string;
    pseudoClasses?: Record<string, StyleTag>; // Optional pseudoClasses field
};

type StyleTag = {
    [key: string]: string | Function;
};

// Function to handle pseudo classes and return a properly formatted style string
const handlePseudoClasses = (
    pseudoClasses: Record<string, StyleTag>,
    className: string
) => {
    return Object.keys(pseudoClasses)
        .map((pseudoClass) => {
            const doubleColonPseudoClasses = [
                "before",
                "after",
                "first-letter",
                "first-line",
                "selection",
                "backdrop",
                "placeholder",
                "marker",
                "spelling-error",
                "grammar-error",
            ];

            const colon = doubleColonPseudoClasses.includes(pseudoClass)
                ? "::"
                : ":";

            return `.${className}${colon}${pseudoClass} { ${handleStyles(
                pseudoClasses[pseudoClass]
            )} }`;
        })
        .join(" ");
};


// Function to handle styles and return a properly formatted style string
const handleStyles = (styles: StyleTag) => {
    const styleString = Object.keys(styles)
        .map((key) => {
            let value =
                typeof styles[key] === "function" ? (styles[key] as Function)() : styles[key];
            if (!value) {
                return "";
            }
            if (key === "pseudoClasses") {
                return "";
            }
            if (value.includes("rgba") || value.includes("rgb")) {
                const hexColor = value.match(/(?<=#)(.*)(?=\))/g)?.toString().split(",")[0];
                if (hexColor) {
                    const rgbColor = hexColor
                        .replace(/../g, (color: string) => {
                            return parseInt(color, 16) + ",";
                        })
                        .slice(0, -1);
                    value = value.replace(hexColor, rgbColor).replace("#", "");
                }
            }
            return `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`;
        })
        .join(" ");
    return styleString;
};

// Function to check if a style tag with the same content already exists
const styleExists = (className: string, styles: string) => {
    for (const cachedStyleTag of styleTagCache.values()) {
        if (
            cachedStyleTag.innerHTML.includes(className) &&
            cachedStyleTag.innerHTML.includes(styles)
        ) {
            return true;
        }
    }
    return false;
};

// Function to create or update a style tag with the provided options
const useStyleTag = (options: UseStyleTagOptions) => {
    const { id, styles } = options;
    const styleTagId = id || `ssui--${window.btoa(new Date().getTime().toString()).slice(-5)}`;
    const formattedStyles = handleStyles(styles);
    const formattedPseudoClasses = handlePseudoClasses(options?.pseudoClasses || {}, options.className);

    if (styleExists(options.className, formattedStyles + formattedPseudoClasses)) {
        return styleTagId;
    }

    const updateStyleTag = () => {
        const styleTag = styleTagCache.get(styleTagId);
        if (styleTag.innerHTML.includes(options.className)) {
            return styleTagId;
        }
        styleTag.innerHTML += `\n.${options.className} { ${formattedStyles} } ${formattedPseudoClasses}`;
    };

    if (styleTagCache.has(styleTagId)) {
        updateStyleTag();
        return styleTagId;
    }

    const styleTag = document.createElement("style");
    styleTag.id = styleTagId;
    styleTag.innerHTML = `.${options.className} { ${formattedStyles} } ${formattedPseudoClasses}`;
    document.head.appendChild(styleTag);
    styleTagCache.set(styleTagId, styleTag);

    return styleTagId;
};



// Function to remove a style tag by its ID
const removeStyleTag = (styleTagId: string) => {
    const styleTag = styleTagCache.get(styleTagId);
    if (styleTag) {
        document.head.removeChild(styleTag);
        styleTagCache.delete(styleTagId);
    }
};

// Function to edit an existing style tag by its ID and new styles
const editStyleTag = (styleTagId: string, styles: StyleTag) => {
    const styleTag = styleTagCache.get(styleTagId);
    if (styleTag) {
        styleTag.innerHTML = styleTag.innerHTML.replace(
            /(?<=\{)(.*)(?=\})/,
            handleStyles(styles)
        );
    }
};

export { useStyleTag, removeStyleTag, editStyleTag };
