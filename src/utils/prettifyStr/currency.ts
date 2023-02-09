import { formatNum } from "../formatNum";

export const prettifyCurrency = (num: number) => formatNum.toCurrencyStr(num);
