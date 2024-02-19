export type NotUndefinedOrNull<T> = T extends undefined | null ? never : T;
