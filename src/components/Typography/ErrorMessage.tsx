import React from "react";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { Text } from "./Text";
import { node, string } from "../../types";

export const ErrorMessage = ({
  error,
  children,
  ...props
}: { error?: string | null } & React.ComponentPropsWithoutRef<"div">) => {
  const { palette } = useTheme();

  return (
    <StyledErrorBox style={{ visibility: !!error ? "visible" : "hidden" }} {...props}>
      <StyledErrorText style={{ color: palette.error.main }}>
        {children ?? error ?? ""}
      </StyledErrorText>
    </StyledErrorBox>
  );
};

const StyledErrorBox = styled.div`
  box-sizing: border-box;
  height: 1.5rem;
  padding: 0.25rem 0;
  white-space: nowrap;
`;

const StyledErrorText = styled(Text)`
  position: relative;
  animation-duration: 1s;
  animation-name: slide-down;
  @keyframes slide-down {
    from {
      top: -1rem;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
`;

ErrorMessage.propTypes = {
  error: string,
  children: node
};
