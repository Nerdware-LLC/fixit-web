export {};

declare global {
  /**
   * `ReactNativeWebView` is attached to the Window object when the
   * site is loaded in the Fixit mobile app's WebView component.
   *
   * The object contains method `postMessage` which is used to send
   * data back to the mobile app.
   */
  interface Window {
    ReactNativeWebView: {
      postMessage: (input: any) => void;
    };
  }
}
