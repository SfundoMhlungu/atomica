export declare function clearEl(el: HTMLElement): void;
interface element {
    tag: string;
    attrs?: Record<any, any>;
    children?: Array<element | string>;
}
export declare function createElement(node: element): HTMLElement | Text;
export declare class PubSub {
    subscribers: Record<string, Array<Function>>;
    subscribe(channel: string, fn: Function): () => void;
    notify(channel: string, ...data: any[]): void;
}
export {};
//# sourceMappingURL=index.d.ts.map