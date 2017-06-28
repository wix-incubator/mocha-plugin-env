

export type Context = {
    assuming:(condition:boolean, message?:string) => Context;
    skip:(expectation: string, callback?: Function)=> void;
} & (Mocha.IContextDefinition | Mocha.ITestDefinition);


export const extend = (ctx: Context) => {
    ctx.assuming = function assuming(condition:boolean, message:string = 'assumption not met'){
        function skipped(description: string, callback: (...args:any[]) => void){
            ctx.skip(`${description} (${message})`, callback);
        }
        if (condition){
            return this;
        } else {
            (skipped as any).__proto__ = ctx;
            return skipped as Context;
        }
    };
};


export const extendEmpty = (ctx: Context) => {
    ctx.assuming = function assuming(condition:boolean, message:string = 'assumption not met'){
        return this;
    };
};
