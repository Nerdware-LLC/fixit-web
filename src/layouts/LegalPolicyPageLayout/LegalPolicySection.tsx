import Text from "@mui/material/Typography";

/**
 * Legal policy section container with h2 header.
 */
export const LegalPolicySection = ({
  sectionNumber,
  header,
  headerID = header.replace(/[^A-Z0-9]/gi, "-"), // by default, just rm all non-alphanum chars from header str
  children,
}: {
  sectionNumber: number;
  header: string;
  headerID?: string;
  children: React.ReactNode; // section content
}) => (
  <div>
    <Text id={headerID} variant="h4" component="h3" style={{ margin: "1rem 0" }}>
      {sectionNumber}. {header}
    </Text>
    {children}
  </div>
);
