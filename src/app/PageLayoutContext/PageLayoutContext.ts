import { createContext } from "react";
import type { Simplify } from "type-fest";

export const PAGE_LAYOUT_CONTEXT_DEFAULT_VALUES = {
  isMobileUserAgent: true,
  isMobilePageLayout: true,
};

export const PageLayoutContext = createContext<PageLayoutContextValues>(
  PAGE_LAYOUT_CONTEXT_DEFAULT_VALUES
);

export type IsMobileUserAgent = { isMobileUserAgent: boolean };
export type IsMobilePageLayout = { isMobilePageLayout: boolean };

export type PageLayoutContextValues = Simplify<IsMobileUserAgent & IsMobilePageLayout>;
