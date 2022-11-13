import { useTheme } from "@mui/material/styles";

export const TextExternalLink = ({
  href,
  linkText,
  children,
  style = {},
  ...props
}: {
  href: string;
  linkText?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
} & React.ComponentPropsWithoutRef<"a">) => {
  const { palette } = useTheme();

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ color: palette.secondary.main, ...style }}
      {...props}
    >
      {linkText ?? children ?? href}
    </a>
  );
};

export const AnchorLink = ({
  href,
  linkText,
  children,
  style = {},
  ...props
}: {
  href: string;
  linkText?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
} & React.ComponentPropsWithoutRef<"a">) => {
  const { palette } = useTheme();

  return (
    <a href={href} style={{ color: palette.secondary.main, ...style }} {...props}>
      {linkText ?? children ?? href}
    </a>
  );
};