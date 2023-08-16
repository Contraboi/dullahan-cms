export default function convertStringToCamelCase(string: string) {
  return string.replace(
    /(?:^\w|[A-Z]|\b\w|\s+)/g,
    function (camelCaseMatch, i) {
      if (+camelCaseMatch === 0) return "";
      return i === 0
        ? camelCaseMatch.toLowerCase()
        : camelCaseMatch.toUpperCase();
    }
  );
}
