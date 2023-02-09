import { AnchorLink } from "@components";

const POLICY_ANCHOR_TARGET_CONFIGS = {
  HEADERS: [
    "WHAT INFORMATION DO WE COLLECT?",
    "HOW DO WE PROCESS YOUR INFORMATION?",
    "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
    "HOW DO WE HANDLE YOUR SOCIAL LOGINS?",
    "HOW LONG DO WE KEEP YOUR INFORMATION?",
    "HOW DO WE KEEP YOUR INFORMATION SAFE?",
    "DO WE COLLECT INFORMATION FROM MINORS?",
    "WHAT ARE YOUR PRIVACY RIGHTS?",
    "CONTROLS FOR DO-NOT-TRACK FEATURES",
    "DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?",
    "DO WE MAKE UPDATES TO THIS NOTICE?",
    "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
    "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?"
  ],
  SUBHEADERS: [
    "personal-info-provided-by-you", //     section 1
    "info-collected-from-other-sources", // section 1
    "list-of-personal-info-use-reasons", // section 2
    "when-is-personal-info-shared" //       section 3
  ]
} as const;

export const POLICY_ANCHOR_TARGETS = Object.fromEntries(
  Object.entries(POLICY_ANCHOR_TARGET_CONFIGS).map(([targetType, targetTextNodesOrIDs]) => [
    targetType,
    Object.fromEntries(
      targetTextNodesOrIDs.map((rawTextNodeOrIDstr, index) => {
        // Ensure all non-alphanum chars are rm'd from element ID
        const ID = rawTextNodeOrIDstr.replace(/[^A-Z0-9]/gi, "-");
        const HREF = `#${ID}`;
        return [
          rawTextNodeOrIDstr,
          {
            ID,
            HREF,
            getLink: (linkText?: string) => (
              <AnchorLink href={HREF}>
                {linkText || (targetType === "HEADERS" ? rawTextNodeOrIDstr : "here")}
              </AnchorLink>
            ),
            ...(targetType === "HEADERS" && { SECTION_NUM: index + 1 })
          }
        ];
      })
    )
  ])
) as {
  [TargetType in keyof typeof POLICY_ANCHOR_TARGET_CONFIGS]: Record<
    typeof POLICY_ANCHOR_TARGET_CONFIGS[TargetType][number],
    {
      ID: string;
      HREF: string;
      getLink: (linkText?: string) => React.ReactNode;
      SECTION_NUM: TargetType extends "HEADERS" ? number : never;
    }
  >;
};
