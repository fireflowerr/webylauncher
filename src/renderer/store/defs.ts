export type Action<T = string, V = unknown> = {[key: string]: V} & {
  type: T | string;
};
