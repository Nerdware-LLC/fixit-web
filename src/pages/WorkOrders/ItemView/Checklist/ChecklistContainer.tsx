import { styled } from "@mui/material/styles";

/**
 * Container for expandable checklist component.
 */
export const ChecklistContainer = ({
  isExpanded,
  onClick,
  children
}: {
  isExpanded: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">) => (
  <StyledChecklistContainer isExpanded={isExpanded} onClick={onClick}>
    {children}
  </StyledChecklistContainer>
);

const StyledChecklistContainer = styled("div")<{ isExpanded: boolean }>(
  ({ theme, isExpanded }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flex: "0 1 auto",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: theme.palette.background.paper,
    ...(isExpanded
      ? {
          paddingBottom: "1rem",
          height: "100%",
          maxHeight: "40vh",
          alignItems: "flex-start", //    x-axis
          justifyContent: "flex-start" // y-axis
        }
      : {
          padding: "1rem",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.action.hover
          }
        })
  })
);
