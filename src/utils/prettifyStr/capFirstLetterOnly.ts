export const capitalizeFirstLetterOnly = <S extends string>(string: S) => {
  // prettier-ignore
  return `${string.charAt(0).toUpperCase()}${string.slice(1).toLowerCase()}` as Capitalize<S>;
};
