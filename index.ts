/// <reference types="./definitions/app.d.ts" />
/// <reference types="./definitions/onejs.d.ts" />
/// <reference types="./definitions/jsx.d.ts" />
/// <reference types="./definitions/puerts.d.ts" />
/// <reference types="./definitions/unity-engine.d.ts" />
/// <reference types="./definitions/proto-overrides.d.ts" />

declare var document: CS.OneJS.Dom.Document

/**
 * OneJS's own h function. Use this to quickly create elements in jsx-like syntax
 * @param type
 * @param props
 * @param children
 * @returns
 */
export function h(type: any, props: any, ...children: any[]): any {
    const element = typeof type === "string" ? document.createElement(type) : type;

    // Assign properties to the element
    for (const [key, value] of Object.entries(props || {})) {
        if (key.startsWith("on") && typeof value === "function") {
            element.addEventListener(key.substring(2).toLowerCase(), value);
        } else if (key === "style" && typeof value === "object") {
            Object.assign(element.style, value);
        } else {
            element.setAttribute(key, value);
        }
    }

    // Append children
    for (const child of children) {
        if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    }

    return element;
}

export { emo } from "./styling/index"
export { useEventfulState } from "./hooks/eventful"