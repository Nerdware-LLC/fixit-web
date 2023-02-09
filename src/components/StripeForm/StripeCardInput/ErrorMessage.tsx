import Text from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const ErrorMessage = ({
  error,
  children,
  ...props
}: { error?: string | null } & React.ComponentPropsWithoutRef<"div">) => (
  <ErrorBox errorExists={!!error} {...props}>
    <ErrorText>{children ?? error ?? ""}</ErrorText>
  </ErrorBox>
);

// prettier-ignore
const ErrorBox = styled("div")<{ errorExists: boolean }>(({ errorExists }) => `
  visibility: ${errorExists ? "visible" : "hidden"};
  box-sizing: border-box;
  height: 1.5rem;
  padding: 0.25rem 0;
  white-space: nowrap;
`);

// prettier-ignore
const ErrorText = styled(Text)(({ theme }) => `
  color: ${theme.palette.error.main};
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
`);
