export function clearEl(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}
function SetAttribs(node, attrs) {
    for (const [key, val] of Object.entries(attrs)) {
        // for some weird reason set attribute set attribute sometimes fails events
        if (key === "onclick" || key === "onselect") {
            node.addEventListener("click", val);
        }
        else if (key === "onchange") {
            node.addEventListener("input", val);
        }
        else {
            node.setAttribute(key, val);
        }
    }
}
export function createElement(node) {
    if (typeof node == "string") {
        return document.createTextNode(node);
    }
    const p = document.createElement(node.tag);
    if (node.attrs) {
        SetAttribs(p, node.attrs);
    }
    node && node.children && node.children.map(createElement)
        .forEach(p.appendChild.bind(p));
    return p;
}
export class PubSub {
    constructor() {
        this.subscribers = {};
    }
    subscribe(channel, fn) {
        if (!this.subscribers[channel]) {
            this.subscribers[channel] = [];
        }
        this.subscribers[channel].push(fn);
        return () => {
            this.subscribers[channel] = this.subscribers[channel].filter(sf => sf !== fn);
        };
    }
    notify(channel, ...data) {
        if (!this.subscribers[channel])
            throw new Error(`${channel} does not exist`);
        this.subscribers[channel].forEach(fn => fn(...data));
    }
}
//# sourceMappingURL=index.js.map