import { styled, alpha } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Text, { typographyClasses } from "@mui/material/Typography";
import AddToListIcon from "@mui/icons-material/PlaylistAddCircle";
import { HelpInfoIcon } from "@/components/DataDisplay/HelpInfoIcon.jsx";
import { dataDisplayClassNames } from "@/components/DataDisplay/classNames.js";
import { NoWrapSpace } from "@/components/Text/NoWrapSpace.jsx";
import { listClassNames } from "../classNames.js";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { Simplify } from "type-fest";

const { emptyPlaceHolderComponent: emptyPlaceHolderClassNames } = listClassNames.virtualizedList;

/**
 * This component is meant to be used by `VirtualizedList` via prop `components.EmptyPlaceholder`.
 */
export const EmptyListFallback = ({
  backgroundIcon,
  text,
  tooltip,
  ...boxProps
}: EmptyListFallbackProps) => (
  <StyledBox className={emptyPlaceHolderClassNames.root} {...boxProps}>
    <div className={emptyPlaceHolderClassNames.circleContainer}>
      {backgroundIcon ?? <AddToListIcon />}
      <Text className={emptyPlaceHolderClassNames.text}>
        {text}
        {tooltip && (
          <>
            <NoWrapSpace />
            <HelpInfoIcon tooltip={tooltip} />
          </>
        )}
      </Text>
    </div>
  </StyledBox>
);

const StyledBox = styled(Box)(({ theme: { palette } }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  overflow: "hidden",

  [`& > .${emptyPlaceHolderClassNames.circleContainer}`]: {
    position: "relative", // for the backgroundIcon
    width: "auto",
    height: "clamp(10rem, 95%, 25rem)",
    aspectRatio: "1 / 1",
    padding: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: alpha(palette.text.icon, 0.03),
    borderRadius: "50%",

    // the background icon:
    "& > svg": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: "95%",
      height: "auto",
      aspectRatio: "1 / 1",
      borderRadius: "50%",
      opacity: 0.15,
    },

    [`& > .${typographyClasses.root}`]: {
      width: "clamp(10rem, 95%, 25rem)",
      whiteSpace: "normal",
      fontSize: "1.35rem",
      lineHeight: "1.65rem",
      textAlign: "center",
      verticalAlign: "middle",
      opacity: "0.9",

      [`& > .${dataDisplayClassNames.helpInfoIcon}`]: {
        verticalAlign: "inherit",
        transform: "translateY(-1.5px)",
      },
    },
  },
}));

export type EmptyListFallbackProps = Simplify<
  {
    /**
     * An icon to display in the background of the `EmptyListFallback`.
     * Defaults to the [Mui `PlaylistAddCircle` icon][icon-url].
     *
     * [icon-url]: https://mui.com/material-ui/material-icons/?query=PlaylistAddCircle
     */
    backgroundIcon?: React.ReactElement<SvgIconProps>;
    text?: React.ReactNode;
    tooltip?: React.ReactNode;
  } & Omit<BoxProps, "children" | "className">
>;
