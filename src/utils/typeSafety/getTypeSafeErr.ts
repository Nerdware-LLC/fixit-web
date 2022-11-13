export const getTypeSafeErr = (
  err: ErrorLike,
  fallBackErrMsg: string = "An unknown error occurred."
): Error => {
  return err instanceof Error
    ? err
    : err === null || err === undefined
    ? new Error(fallBackErrMsg)
    : typeof err === "string" && err !== ""
    ? new Error(err)
    : typeof err === "object" &&
      !Array.isArray(err) &&
      Object.prototype.hasOwnProperty.call(err, "message")
    ? new Error((err as { message: string }).message)
    : new Error(
        // prettier-ignore
        `${fallBackErrMsg} Original error payload: ${typeof err !== "bigint" ? JSON.stringify(err) : "[BigInt]"}`
      );
};
