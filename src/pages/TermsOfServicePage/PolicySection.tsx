import { LegalPolicySection } from "@/layouts/LegalPolicyPageLayout/LegalPolicySection";
import { ToS_SECTIONS } from "./TermsOfServiceSections";

/**
 * TermsOfServicePage wrapper around `LegalPolicySection`
 */
export const PolicySection = ({ header, children }: PolicySectionProps) => (
  <LegalPolicySection
    sectionNumber={ToS_SECTIONS[header].SECTION_NUM}
    header={header}
    headerProps={{ id: ToS_SECTIONS[header].ID }}
  >
    {children}
  </LegalPolicySection>
);

export type PolicySectionProps = {
  header: keyof typeof ToS_SECTIONS;
  children: React.ReactNode; // section content
};
