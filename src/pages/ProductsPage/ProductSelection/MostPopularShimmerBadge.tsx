import Text from "@mui/material/Typography";
import { ShimmerBox } from "@components";

export const MostPopularShimmerBadge = () => (
  <ShimmerBox>
    <Text
      sx={{
        fontSize: "0.9rem",
        paddingTop: "1px",
        color: ({ palette }) => palette.getContrastText(palette.grey[900])
      }}
    >
      Most Popular
    </Text>
  </ShimmerBox>
);
