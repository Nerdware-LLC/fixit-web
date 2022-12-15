import styled from "@emotion/styled";

export const PageHeaderContainer = ({
  style = {},
  children
}: {
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => <StyledPageHeaderContainer style={style}>{children}</StyledPageHeaderContainer>;

const StyledPageHeaderContainer = styled.div`
  height: 3rem;
  min-height: 6vh;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
