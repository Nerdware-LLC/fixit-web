import { styled } from "@mui/material/styles";

export const PersonalInfoCollectedTable = () => (
  <PrivacyPolicyTable>
    <thead>
      <tr>
        <th>Category</th>
        <th>Examples</th>
        <th>Collected</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>A. Identifiers</td>
        <td>
          Contact details, such as real name, alias, postal address, telephone or mobile contact
          number, unique personal identifier, online identifier, Internet Protocol address, email
          address, and account name
        </td>
        <td>NO</td>
      </tr>
      <tr>
        <td>
          B. Personal information categories listed in the California Customer Records statute
        </td>
        <td>
          Name, contact information, education, employment, employment history, and financial
          information
        </td>
        <td>NO</td>
      </tr>
      <tr>
        <td>C. Protected classification characteristics under California or federal law</td>
        <td>Gender and date of birth</td>
        <td>NO</td>
      </tr>
      <tr>
        <td>D. Commercial information</td>
        <td>
          Transaction information, purchase history, financial details, and payment information
        </td>
        <td>NO</td>
      </tr>
      <tr>
        <td>E. Biometric information</td>
        <td>Fingerprints and voiceprints</td>
        <td>NO</td>
      </tr>
      <tr>
        <td>F. Internet or other similar network activity</td>
        <td>
          Browsing history, search history, online behavior, interest data, and interactions with
          our and other websites, applications, systems, and advertisements
        </td>
        <td>NO</td>
      </tr>
      <tr>
        <td>G. Geolocation data</td>
        <td>Device location</td>
        <td>NO</td>
      </tr>
      <tr>
        <td>H. Audio, electronic, visual, thermal, olfactory, or similar information</td>
        <td>
          Images and audio, video or call recordings created in connection with our business
          activities
        </td>
        <td>NO</td>
      </tr>
      <tr>
        <td>I. Professional or employment-related information</td>
        <td>
          Business contact details in order to provide you our Services at a business level or job
          title, work history, and professional qualifications if you apply for a job with us
        </td>
        <td>NO</td>
      </tr>
      <tr>
        <td>J. Education Information</td>
        <td>Student records and directory information</td>
        <td>NO</td>
      </tr>
      <tr>
        <td>K. Inferences drawn from other personal information</td>
        <td>
          Inferences drawn from any of the collected personal information listed above to create a
          profile or summary about, for example, an individual's preferences and characteristics
        </td>
        <td>NO</td>
      </tr>
    </tbody>
  </PrivacyPolicyTable>
);

const PrivacyPolicyTable = styled("table")(({ theme }) => ({
  borderCollapse: "collapse",
  "& th,td": {
    padding: "0.5rem",
    border: `1px solid ${theme.palette.grey[700]}`
  },
  "& td:last-child": {
    textAlign: "center"
  }
}));
