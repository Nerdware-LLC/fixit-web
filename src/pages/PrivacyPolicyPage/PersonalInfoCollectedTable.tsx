import { PolicyInfoTable } from "@/layouts/LegalPolicyPageLayout/PolicyInfoTable.jsx";

export const PersonalInfoCollectedTable = () => (
  <PolicyInfoTable
    headers={["Category", "Examples", "Collected"]}
    dataRows={[
      [
        "A. Identifiers",
        "Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name",
        "NO",
      ],
      [
        "B. Personal information categories listed in the California Customer Records statute",
        "Name, contact information, education, employment, employment history, and financial information",
        "NO",
      ],
      [
        "C. Protected classification characteristics under California or federal law",
        "Gender and date of birth",
        "NO",
      ],
      [
        "D. Commercial information",
        "Transaction information, purchase history, financial details, and payment information",
        "NO",
      ],
      ["E. Biometric information", "Fingerprints and voiceprints", "NO"],
      [
        "F. Internet or other similar network activity",
        "Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements",
        "NO",
      ],
      ["G. Geolocation data", "Device location", "NO"],
      [
        "H. Audio, electronic, visual, thermal, olfactory, or similar information",
        "Images and audio, video or call recordings created in connection with our business activities",
        "NO",
      ],
      [
        "I. Professional or employment-related information",
        "Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us",
        "NO",
      ],
      ["J. Education Information", "Student records and directory information", "NO"],
      [
        "K. Inferences drawn from other personal information",
        "Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual's preferences and characteristics",
        "NO",
      ],
    ]}
    sx={{ "& td:last-of-type": { textAlign: "center" } }}
  />
);
