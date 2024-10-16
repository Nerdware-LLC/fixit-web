import Text, { type TypographyProps } from "@mui/material/Typography";
import type { Except } from "type-fest";

export type LegalPolicySectionProps = {
  header: string;
  headerProps?: Except<TypographyProps, "children">;
  sectionNumber?: number;
  children: React.ReactNode; // section content
};

/**
 * Legal policy section container with h2 header.
 */
export const LegalPolicySection = ({
  sectionNumber,
  header,
  headerProps = {},
  children,
}: LegalPolicySectionProps) => {
  // Destructure `headerProps` and apply defaults
  const {
    id: headerID = header.replace(/[^A-Z0-9]/gi, "-"), // by default, just rm all non-alphanum chars from header str
    variant: headerVariant = "h4",
    component: headerComponent = "h3",
    style: headerStyle = {},
    ...restHeaderProps
  } = headerProps;

  return (
    <div>
      <Text
        id={headerID}
        variant={headerVariant}
        component={headerComponent}
        style={{ margin: "1rem 0", ...headerStyle }}
        {...restHeaderProps}
      >
        {sectionNumber ? `${sectionNumber}. ${header}` : header}
      </Text>
      {children}
    </div>
  );
};
