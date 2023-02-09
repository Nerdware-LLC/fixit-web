import { LegalPolicySection } from "@layouts/LegalPolicyPageLayout";
import { ToS_SECTIONS } from "./TermsOfServiceSections";

/**
 * TermsOfServicePage wrapper around `LegalPolicySection`
 */
export const PolicySection = ({
  header,
  children
}: {
  header: keyof typeof ToS_SECTIONS & string;
  children: React.ReactNode; // section content
}) => (
  <LegalPolicySection
    sectionNumber={ToS_SECTIONS[header].SECTION_NUM}
    header={header}
    headerID={ToS_SECTIONS[header].ID}
  >
    {children}
  </LegalPolicySection>
);
