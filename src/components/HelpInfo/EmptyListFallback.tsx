import { styled, alpha } from "@mui/material/styles";
import Container, { type ContainerProps } from "@mui/material/Container";
import Text, { typographyClasses } from "@mui/material/Typography";
import { HelpInfoIcon } from "@components/HelpInfo";
import { helpInfoClassNames as classNames } from "./classNames";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export const EmptyListFallback = ({
  backgroundIcon,
  text,
  tooltip,
  border = false,
  style = {},
  children,
  ...containerProps
}: EmptyListFallbackProps) => (
  <StyledContainer
    style={{ ...(border && { borderWidth: "1px" }), ...style }}
    className={classNames.emptyListFallbackRoot}
    {...containerProps}
  >
    <div className={classNames.emptyListFallbackBackgroundIconContainer}>{backgroundIcon}</div>
    <Text className={classNames.emptyListFallbackText}>
      {text}
      {tooltip && <HelpInfoIcon tooltip={tooltip} />}
    </Text>
    {children}
  </StyledContainer>
);

const StyledContainer = styled(Container)(({ theme }) => ({
  position: "relative", // for the backgroundIcon
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  borderStyle: "solid",
  borderWidth: 0,
  borderColor: theme.palette.divider,
  borderRadius: "0.35rem",
  whiteSpace: "nowrap",

  [`& > .${classNames.emptyListFallbackBackgroundIconContainer}`]: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    height: "85%",
    aspectRatio: "1 / 1",
    padding: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.text.icon, 0.2),
    borderRadius: "50%",
    opacity: 0.15,

    // the background icon:
    [`& > svg`]: {
      borderRadius: "50%",
      height: "calc(100% - 0.5rem)",
      width: "auto",
      aspectRatio: "1 / 1",
    },
  },

  [`& > .${typographyClasses.root}`]: {
    whiteSpace: "inherit",
    fontSize: "1.35rem",
    lineHeight: "1.65rem",
    textAlign: "center",
    opacity: 0.9,

    // the HelpInfoIcon:
    [`& > .${classNames.helpInfoIcon}`]: {
      verticalAlign: "middle",
      margin: "0 0 0.1rem 0.3rem",
    },
  },
}));

export type EmptyListFallbackProps = {
  backgroundIcon: React.ReactElement<SvgIconProps>;
  text?: React.ReactNode;
  tooltip?: React.ReactNode;
  border?: boolean;
} & ContainerProps;
