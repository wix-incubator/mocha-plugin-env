import {extend, extendEmpty} from './assuming';
export {inBrowser, globalObject} from './browser';
import {globalObject} from "./browser";

export function register(){
    ['describe', 'it'].forEach(function (ctxId) {
        let _val = globalObject[ctxId];
        extend(_val);
        Object.defineProperty(globalObject, ctxId, {
            get: function(){ return _val; },
            set: function(n){ extend(n); _val = n; }
        });
    });
    ['xdescribe', 'xit'].forEach(function (ctxId) {
        let _val = globalObject[ctxId];
        extendEmpty(_val);
        Object.defineProperty(globalObject, ctxId, {
            get: function(){ return _val; },
            set: function(n){ extendEmpty(n); _val = n; }
        });
    });
}

declare module "mocha" {
    interface IContextDefinition {
        assuming: (condition: boolean, message?:string) => IContextDefinition;
    }
    interface ITestDefinition {
        assuming: (condition: boolean, message?:string) => ITestDefinition;
    }
}
