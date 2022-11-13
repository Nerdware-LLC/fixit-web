import { formatNum } from "../formatNum";

export const prettifyCurrency = (num: number) => formatNum.toCurrencyStr(num); // TODO make sure this format does what I think it does.
