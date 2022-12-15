import ListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import { styled as muiStyled, useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";

export const CoreListItemLayout = ({
  onClick,
  topRowComponents,
  bottomRowComponents
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  topRowComponents: React.ReactNode;
  bottomRowComponents?: React.ReactNode;
}) => {
  const { palette } = useTheme();

  return (
    <ListItem
      style={{
        maxHeight: "12rem",
        width: "100%",
        padding: "0.5rem"
      }}
    >
      <ListItemButton onClick={onClick}>
        <ListItemContentContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              ...(bottomRowComponents
                ? {
                    padding: "0.5rem 0.5rem 0.25rem 0.5rem",
                    borderRadius: "0.5rem 0.5rem 0 0",
                    backgroundColor: palette.divider
                  }
                : {
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    backgroundColor: palette.background.paper
                  })
            }}
          >
            {topRowComponents}
          </div>
          {!!bottomRowComponents && <BottomRow>{bottomRowComponents}</BottomRow>}
        </ListItemContentContainer>
      </ListItemButton>
    </ListItem>
  );
};

const ListItemButton = muiStyled(MuiListItemButton)(({ theme }) => ({
  width: "100%",
  padding: "0",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "0.5rem",
  "&:hover": {
    borderColor: theme.palette.secondary.main
  }
}));

const ListItemContentContainer = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const BottomRow = styled.div`
  width: 100%;
  padding: 0.5rem 0.5rem 0.25rem 0.5rem;
  display: flex;
`;
