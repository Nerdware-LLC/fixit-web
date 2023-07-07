import Text from "@mui/material/Typography";
import { LegalPolicySection } from "@layouts/LegalPolicyPageLayout/LegalPolicySection";
import { POLICY_ANCHOR_TARGETS } from "./PolicyAnchorTargets";

/**
 * PrivacyPolicyPage wrapper around `LegalPolicySection`
 */
export const PolicySection = ({ header, summary, children }: PolicySectionProps) => (
  <LegalPolicySection
    sectionNumber={POLICY_ANCHOR_TARGETS.HEADERS[header].SECTION_NUM}
    header={header}
    headerID={POLICY_ANCHOR_TARGETS.HEADERS[header].ID}
  >
    {summary && <InShort summary={summary} />}
    {children}
  </LegalPolicySection>
);

export const InShort = ({ summary }: InShortProps) => (
  <Text>
    <i>
      <b>In Short: </b>
      {summary}
    </i>
  </Text>
);

export type PolicySectionProps = {
  header: keyof typeof POLICY_ANCHOR_TARGETS.HEADERS & string;
  summary?: string;
  children: React.ReactNode; // section content
};

export type InShortProps = { summary: string };
