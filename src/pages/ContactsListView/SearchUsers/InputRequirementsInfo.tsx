import Box, { type BoxProps } from "@mui/material/Box";
import Text, { type TypographyProps } from "@mui/material/Typography";
import type { SearchUsersInputActionType } from "./types.js";

export const InputRequirementsInfo = ({
  inputActionType,
  slotProps = {},
}: InputRequirementsInfoProps) => (
  <>
    <Box
      component="ul"
      style={{ margin: "0.25rem 0", paddingLeft: "1.5rem", fontSize: "0.9rem" }}
      sx={{
        "& *": {
          fontSize: "inherit",
          lineHeight: "inherit",
        },
      }}
      {...(slotProps?.list ?? {})}
    >
      {INPUT_INFO_TEXT[inputActionType].requirements.map((str) => (
        <li key={str}>
          <Text>{str}</Text>
        </li>
      ))}
    </Box>
    <Text style={{ fontSize: "0.9rem" }} {...(slotProps?.exampleText ?? {})}>
      Example: "<code>{INPUT_INFO_TEXT[inputActionType].example}</code>"
    </Text>
  </>
);

export const INPUT_INFO_TEXT: Record<
  Extract<SearchUsersInputActionType, string>,
  { header: string; requirements: string[]; example: string }
> = {
  search: {
    header: "To find a user, please provide a valid Fixit handle:",
    requirements: [
      `Begins with "@", followed by 3-50 characters.`,
      `Only contains letters, numbers, and underscores.`,
    ],
    example: "@fixit_Fan123",
  },
  invite: {
    header: "To send an invite, please provide a valid",
    requirements: [`Email address, or`, `US phone number`],
    example: "(555) 555-5555",
  },
} as const;

export type InputRequirementsInfoProps = {
  inputActionType: NonNullable<SearchUsersInputActionType>;
  slotProps?: {
    list?: Omit<BoxProps<"ul">, "children">;
    exampleText?: Omit<TypographyProps, "children">;
  };
};
