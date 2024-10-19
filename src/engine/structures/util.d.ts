export type Cast<T> = unknown & T;
export type CastTo<T, U> = T extends U ? T : U;
export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
