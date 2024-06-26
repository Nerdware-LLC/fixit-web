import { styled } from "@mui/material/styles";
import {
  isAuthenticatedStore,
  isActiveAccountStore,
  isConnectOnboardingCompleteStore,
  type IsAuthenticated,
  type IsActiveAccount,
  type IsConnectOnboardingComplete,
} from "@/stores";
import { MockApolloProvider } from "@/tests/mockProviders/MockApolloProvider.jsx";
import { StoryInfoDecorator, type StoryInfoDecoratorProps } from "./StoryInfoDecorator.jsx";
import type { ReactRenderer } from "@storybook/react";
import type { DecoratorFunction, Args, PartialStoryFn, StoryContext } from "@storybook/types";
import type { Simplify } from "type-fest";
import type { MockApolloDecoratorArgs } from "./MockApolloDecorator.jsx";

const AppStateInfo = ({
  componentName = "component Story",
  appState: {
    isUserAuthenticated = false,
    isAccountActive = false,
    isConnectOnboardingComplete = false,
  } = {},
}: AppStateInfoProps) => {
  isAuthenticatedStore.set(isUserAuthenticated);
  isActiveAccountStore.set(isAccountActive);
  isConnectOnboardingCompleteStore.set(isConnectOnboardingComplete);

  return (
    <>
      This {componentName} reflects the following app state:{" "}
      <StyledTable>
        <tbody>
          {[
            {
              appStateParamName: "isUserAuthenticated",
              value: isUserAuthenticated,
              description: isUserAuthenticated
                ? "The user is authenticated"
                : "The user is not authenticated",
            },
            {
              appStateParamName: "isAccountActive",
              value: isAccountActive,
              description: isAccountActive
                ? "The user has an active subscription"
                : "The user does not have an active subscription",
            },
            {
              appStateParamName: "isConnectOnboardingComplete",
              value: isConnectOnboardingComplete,
              description: isConnectOnboardingComplete
                ? "The user has completed Stripe Connect onboarding"
                : "The user has not completed Stripe Connect onboarding",
            },
          ].map(({ appStateParamName, value, description }) => (
            <tr key={appStateParamName}>
              <td>{appStateParamName}:</td>
              <td>{value.toString()}</td>
              <td>{description}.</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </>
  );
};

const StyledTable = styled("table")(({ theme: { palette } }) => ({
  borderSpacing: "1rem 0",
  "& > tbody > tr > td": {
    fontSize: "0.875rem",
    whiteSpace: "nowrap",
    "&:nth-of-type(1)": {
      fontFamily: `source-code-pro,Menlo,Monaco,Consolas,"Courier New",monospace;`,
      textAlign: "left",
    },
    "&:nth-of-type(2)": {
      fontFamily: `source-code-pro,Menlo,Monaco,Consolas,"Courier New",monospace;`,
      color: palette.secondary.main,
    },
    "&:nth-of-type(3)": {
      textAlign: "left",
      fontStyle: "italic",
      fontWeight: "300",
    },
  },
}));

const AppStateInfoDecorator = ({
  componentName,
  appState,
  disabled = false,
  storyInfoContainerProps, // <-- equivalent to `BoxProps`
  children, // <-- the story
}: AppStateInfoDecoratorProps) => (
  <StoryInfoDecorator
    storyInfo={<AppStateInfo componentName={componentName} appState={appState} />}
    disabled={disabled}
    storyInfoContainerProps={storyInfoContainerProps}
  >
    {children}
  </StoryInfoDecorator>
);

/**
 * This `decorator` wraps a `Story` in an {@link AppStateInfoDecorator} component,
 * as well as a {@link MockApolloProvider} (required for the Apollo reactive-vars).
 */
export const withAppStateInfoDecorator = <StoryArgs extends Args>(
  storyFn: PartialStoryFn<ReactRenderer, StoryArgs & AppStateInfoDecoratorArgs>,
  {
    viewMode,
    args: {
      _app_state_info_decorator_args: appStateInfoDecoratorArgs = {},
      _mock_apollo_decorator_args: mockApolloDecoratorArgs = {},
    },
  }: StoryContext<ReactRenderer, StoryArgs & AppStateInfoDecoratorArgs>
) => (
  <MockApolloProvider {...mockApolloDecoratorArgs}>
    <AppStateInfoDecorator disabled={viewMode === "docs"} {...appStateInfoDecoratorArgs}>
      {storyFn()}
    </AppStateInfoDecorator>
  </MockApolloProvider>
);

// Ensure `withAppStateInfoDecorator` satisfies the `DecoratorFunction` type:
withAppStateInfoDecorator satisfies DecoratorFunction<
  ReactRenderer,
  Args & AppStateInfoDecoratorArgs
>;

type AppStateInfoProps = {
  componentName?: string;
  appState?: {
    isUserAuthenticated?: IsAuthenticated;
    isAccountActive?: IsActiveAccount;
    isConnectOnboardingComplete?: IsConnectOnboardingComplete;
  };
};

export type AppStateInfoDecoratorProps = Simplify<
  Partial<Omit<StoryInfoDecoratorProps, "storyInfo">> & AppStateInfoProps
>;

/**
 * {@link withAppStateInfoDecorator} passes all values nested under
 * `_app_state_info_decorator_args` to the {@link AppStateInfoDecorator} component.
 */
export type AppStateInfoDecoratorArgs = {
  _app_state_info_decorator_args?: AppStateInfoDecoratorProps;
} & MockApolloDecoratorArgs;
