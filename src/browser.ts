declare const window:any;
declare const global:any;
export function inBrowser(){ return (typeof window !== 'undefined'); }
export const globalObject:{[k:string]:any} = (typeof global === 'undefined') ? window : global;
