export {};

declare global {
  /**
   * // TODO Add jsdoc to Function in @types/Function.d.ts
   */
  type Function = (...args: any[]) => any;

  /**
   * // TODO Add jsdoc to AsyncFunction in @types/Function.d.ts
   */
  type AsyncFunction = (...args: any[]) => Promise<any>;
}
