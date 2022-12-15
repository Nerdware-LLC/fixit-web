import { Text, usePageLayoutContext } from "@components";

export const IntroText = () => {
  const { isMobilePageLayout } = usePageLayoutContext();

  const styles = isMobilePageLayout ? layoutStyles.mobile : layoutStyles.desktop;

  return (
    <div style={{ margin: "1.5rem 0" }}>
      <Text variant="secondary" style={styles.tagline}>
        Work Order Management Made Easy.
      </Text>
      <br />
      <Text style={styles.text}>
        People who need to get things done use <span style={{ color: "#f78103" }}>Fixit</span> to
        keep in touch with contractors and customers, create work orders, submit invoices, and
        manage payments - all in one place!
      </Text>
      <br />
      <Text style={styles.text}>
        Whether you&apos;re a homeowner planning your next kitchen renovation, or a general
        contractor looking for a better way to submit invoices and get paid for your work,{" "}
        <span style={{ color: "#f78103" }}>Fixit</span> makes it easy.
      </Text>
    </div>
  );
};

const layoutStyles = {
  desktop: {
    tagline: {
      fontWeight: "bold",
      fontSize: "3rem",
      lineHeight: "3.15rem"
    },
    text: {
      fontSize: "1.5rem",
      lineHeight: "1.65rem"
    }
  },
  mobile: {
    tagline: {
      fontWeight: "bold",
      fontSize: "1.85rem",
      lineHeight: "2.2rem"
    },
    text: {
      fontSize: "1.25rem",
      lineHeight: "1.6rem"
    }
  }
};
