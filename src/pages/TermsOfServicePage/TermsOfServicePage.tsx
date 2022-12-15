import { PageContainer } from "@layouts";

export const TermsOfServicePage = () => {
  return (
    <PageContainer
      style={{
        height: "auto",
        width: "95vw",
        overflowY: "auto",
        overflowX: "hidden"
      }}
    >
      <div style={{ padding: "3rem 10rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "0" }}>Terms of Service</h1>
        <h4>Last updated January 01, 2022</h4>
        <p>This page will hold the ToS.</p>
      </div>
    </PageContainer>
  );
};
