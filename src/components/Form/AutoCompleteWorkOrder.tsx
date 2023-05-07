import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { Avatar } from "@components/Avatar";
import { getDateAndTime } from "@utils/dateTime";
import { AutoComplete, type AutoCompleteProps } from "./AutoComplete";
import type { WorkOrder, FixitUser } from "@graphql/types";

/**
 * AutoCompleteWorkOrder is a Mui Autocomplete input used to select a WorkOrder
 * from the provided list of WorkOrder `options`.
 *
 * @note This component uses a `multiline` Input, which with Mui's Autocomplete
 * currently causes the following console warning in non-prod envs: `A textarea
 * element was provided to Autocomplete where input was expected.`. This warning
 * currently only appears in dev, so is being ignored for now.
 */
export const AutoCompleteWorkOrder = ({
  InputProps = {},
  ...props
}: AutoCompleteWorkOrderProps) => {
  const handleRenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    { _renderUser, location, createdAt }: AutoCompleteWorkOrderOption
  ) => (
    <SelectableWorkOrderOption
      _renderUser={_renderUser}
      location={location}
      createdAt={createdAt}
      {...props}
    />
  );

  const handleGetOptionLabel = ({
    _renderUser: { profile, handle },
    location: { streetLine1 },
    createdAt,
  }: AutoCompleteWorkOrderOption) =>
    `${profile?.displayName || handle}\n${streetLine1}\n${getDateAndTime(createdAt)}`;

  return (
    <AutoComplete
      renderOption={handleRenderOption}
      getOptionLabel={handleGetOptionLabel}
      InputProps={{
        multiline: true,
        sx: {
          whiteSpace: "pre",
          ...(InputProps?.sx ?? {}),
        },
        ...InputProps,
      }}
      {...props}
    />
  );
};

const SelectableWorkOrderOption = ({
  _renderUser, // createdBy or assignedTo
  location,
  createdAt,
  ...props
}: { _renderUser: FixitUser } & Pick<WorkOrder, "location" | "createdAt"> &
  React.HTMLAttributes<HTMLLIElement>) => (
  <Box
    component="li"
    style={{
      height: "5.5rem",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
    sx={{
      "& *": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
      "& > *": {
        maxWidth: "100%",
      },
    }}
    {...props}
  >
    <Avatar profile={_renderUser.profile} showDisplayName />
    <Text style={{ marginLeft: "3rem", marginTop: "-0.5rem" }}>{location.streetLine1}</Text>
    <Text style={{ marginLeft: "3rem" }}>{getDateAndTime(createdAt)}</Text>
  </Box>
);

export type AutoCompleteWorkOrderProps = Omit<
  AutoCompleteProps<AutoCompleteWorkOrderOption>,
  "renderOption" | "getOptionLabel"
>;

/**
 * AutoCompleteWorkOrderOption is an AutoCompleteOption with additional internal
 * property `_renderUser`, which objects must include to indicate the user that
 * will be rendered in the option and label.
 */
export type AutoCompleteWorkOrderOption = WorkOrder & { _renderUser: FixitUser };
export type AutoCompleteWorkOrderOptions = Array<AutoCompleteWorkOrderOption>;
