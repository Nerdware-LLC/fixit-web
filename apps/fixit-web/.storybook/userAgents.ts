/**
 * Custom `navigator.userAgent` values for Storybook
 *
 * These objects are provided to `parameters` of the `storybook-addon-useragent` addon.
 *
 * @docs https://storybook.js.org/addons/storybook-addon-useragent
 */
export const customUserAgents = [
  {
    name: "Desktop - Windows",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
  },
  {
    name: "Desktop - Mac",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
  },
  {
    name: "Mobile - Android",
    userAgent:
      "Mozilla/5.0 (Linux; Android 10; Android SDK built for x86) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36",
  },
  {
    name: "Mobile - iOS",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1",
  },
];
