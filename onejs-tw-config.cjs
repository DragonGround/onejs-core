const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")

let theme = rem2px(defaultTheme)
theme.extend = {
    transitionTimingFunction: {
        DEFAULT: "ease-in-out",
        "in-out": "ease-in-out",
    },
}
exports.theme = theme

exports.paths = []

exports.plugins = [
    plugin(function ({ addUtilities, matchUtilities, theme }) {
        addUtilities({
            ".bg-crop": {
                "-unity-background-scale-mode": "scale-and-crop",
            },
            ".bg-fit": {
                "-unity-background-scale-mode": "scale-to-fit",
            },
            ".bg-fill": {
                "-unity-background-scale-mode": "scale-to-fill",
            },
            ".font-normal": {
                "-unity-font-style": "normal",
            },
            ".bold": {
                "-unity-font-style": "bold",
            },
            ".italic": {
                "-unity-font-style": "italic",
            },
            ".bold-italic": {
                "-unity-font-style": "bold-and-italic",
            },
            ".transition-none": { "transition-property": "none" },
            ".transition-all": {
                "transition-property": "all",
                "transition-duration": "150ms",
            },
            ".transition": {
                "transition-property": "color, background-color, border-color, opacity",
                "transition-duration": "150ms",
            },
            ".transition-colors": {
                "transition-property": "color, background-color, border-color",
                "transition-duration": "150ms",
            },
            ".transition-opacity": {
                "transition-property": "opacity",
                "transition-duration": "150ms",
            },
            ".duration-0": { "transition-duration": "0s" },
            ".duration-75": { "transition-duration": "75ms" },
            ".duration-100": { "transition-duration": "100ms" },
            ".duration-150": { "transition-duration": "150ms" },
            ".duration-200": { "transition-duration": "200ms" },
            ".duration-300": { "transition-duration": "300ms" },
            ".duration-500": { "transition-duration": "500ms" },
            ".duration-700": { "transition-duration": "700ms" },
            ".duration-1000": { "transition-duration": "1000ms" },
            ".scale-none": { scale: "none" },
            ".rotate-none": { rotate: "none" },
        })

        matchUtilities({
            fontdef: (value) => ({ "-unity-font-definition": `url("${value}")` }),
        }, {})

        matchUtilities(
            {
                text: (value) => ({ "-unity-text-align": value }),
            },
            {
                values: {
                    left: "middle-left",
                    center: "middle-center",
                    right: "middle-right",
                    "upper-left": "upper-left",
                    "upper-center": "upper-center",
                    "upper-right": "upper-right",
                    "lower-left": "lower-left",
                    "lower-center": "lower-center",
                    "lower-right": "lower-right",
                },
            }
        )

        matchUtilities(
            {
                translate: (value) => ({ translate: value }),
                "translate-x": (value) => ({ translate: `${value} 0` }),
                "translate-y": (value) => ({ translate: `0 ${value}` }),
            },
            {
                supportsNegativeValues: true,
                values: theme("translate"),
            }
        )

        matchUtilities(
            {
                scale: (value) => ({ scale: value }),
                "scale-x": (value) => ({ scale: `${value} 1` }),
                "scale-y": (value) => ({ scale: `1 ${value}` }),
            },
            {
                supportsNegativeValues: true,
                values: theme("scale"),
            }
        )

        matchUtilities(
            {
                rotate: (value) => ({ rotate: value }),
            },
            {
                supportsNegativeValues: true,
                values: theme("rotate"),
            }
        )

        matchUtilities(
            {
                inset: (value) => ({
                    top: value,
                    bottom: value,
                    left: value,
                    right: value,
                }),
            },
            {
                supportsNegativeValues: true,
                values: theme("inset"),
            }
        )
    }),
]

exports.corePlugins = {
    // USS cannot support dynamic custom properties within rgb()
    // which is what is used by Tailwind for opacity scales
    transitionProperty: false,
    transitionDuration: false,
    backdropOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    ringOpacity: false,
    textOpacity: false,
    transform: false,
    translate: false,
    rotate: false,
    scale: false,
    fontWeight: false,
    lineHeight: false,
}

/**
 * Utilities
 */

// rem is not supported in USS
function rem2px(input, fontSize = 16) {
    if (input == null) {
        return input
    }
    switch (typeof input) {
        case "object":
            if (Array.isArray(input)) {
                return input.map((val) => rem2px(val, fontSize))
            }
            const ret = {}
            for (const key in input) {
                ret[key] = rem2px(input[key], fontSize)
            }
            return ret
        case "string":
            return input.replace(/(\d*\.?\d+)rem$/, (_, val) => `${parseFloat(val) * fontSize}px`)
        case "function":
            return eval(input.toString().replace(/(\d*\.?\d+)rem/g, (_, val) => `${parseFloat(val) * fontSize}px`))
        default:
            return input
    }
}
