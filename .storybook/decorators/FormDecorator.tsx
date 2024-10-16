import { safeJsonStringify } from "@nerdware/ts-type-safety-utils";
import { Form, type FormProps } from "@/components/Form";
import type { ReactRenderer } from "@storybook/react";
import type { DecoratorFunction, Args, PartialStoryFn, StoryContext } from "@storybook/types";
import type { SetOptional } from "type-fest";

/**
 * ### How to use `withFormDecorator` / `FormDecorator`:
 *
 * ```tsx
 * // This example uses `withFormDecorator` to wrap an arbitrary component,
 * // `FooTextInput`, in a `Form` component decorator.
 * import { FooTextInput, type FooTextInputProps } from "./FooTextInput";
 * // Import the necessary types and any existing values the `Form` should use:
 * import { fooFormYupSchema } from "./myYupSchema";
 * import type { Meta, StoryObj } from "@storybook/react";
 *
 * const meta = {
 *   component: FooTextInput, // <-- Will be wrapped in a `<Form>` decorator
 *   decorators: [withFormDecorator],
 *   // Include your component's props and the `FormDecoratorArgs`:
 * } satisfies Meta<FooTextInputProps & FormDecoratorArgs>;
 *
 * export const FooStoryDemo = {
 *   args: {
 *     _form_decorator_args: {
 *       initialValues: { fooField: "foo" },
 *       validationSchema: fooFormYupSchema.pick(["fooField"]),
 *     },
 *     // ... other FooTextInput args ...
 *   },
 * } satisfies StoryObj<typeof meta>;
 * ```
 */
export const withFormDecorator = <StoryArgs extends Args>(
  Story: PartialStoryFn<ReactRenderer, StoryArgs & FormDecoratorArgs>,
  {
    args: {
      _form_decorator_args: {
        onSubmit = (formValues) => {
          // eslint-disable-next-line no-alert
          alert(`Form values: ${safeJsonStringify(formValues, null, 2)}`);
        },
        style = {},
        ...formDecoratorArgs
      },
    },
  }: StoryContext<ReactRenderer, StoryArgs & FormDecoratorArgs>
) => (
  <Form
    onSubmit={onSubmit}
    style={{
      margin: "auto",
      width: "fit-content",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}
    {...formDecoratorArgs}
  >
    <Story />
  </Form>
);

// Ensure `withFormDecorator` satisfies the `DecoratorFunction` type:
withFormDecorator satisfies DecoratorFunction<ReactRenderer, Args & FormDecoratorArgs>;

/**
 * {@link withFormDecorator} passes all values nested under `_form_decorator_args` to the
 * {@link Form} component decorator.
 */
export type FormDecoratorArgs = {
  /**
   * `FormDecorator` args are simply {@link FormProps} with Storybook-relevant defaults:
   *
   * - `onSubmit` defaults to an `alert` with the form values
   *
   * > _Note: This property is snake-cased to silence warnings about invalid camelCase prop on DOM
   *   nodes, which commonly occurs in component trees that spread rest props all the way down._
   */
  _form_decorator_args: SetOptional<FormProps, "onSubmit" | "children">;
};
