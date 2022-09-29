// 简单类型
export type SimpleType<T> = T;
// 复杂类型
export type ComplexType<T> = {
  statusCode?: number;
  error?: boolean;
  data?: T;
  message?: string;
};
export type ResType<T = any> = SimpleType<T> | ComplexType<T>;
