import accessObjectValueByString from "../utils/accessObjectValueAsString";

export const switchFilterCondition = <T>(
  condition: FilterCondition,
  searchBy: {
    key: string;
    value: string;
  },
  data: T
) => {
  const objectValueAsString = accessObjectValueByString<T, keyof T>(
    data,
    searchBy.key
  );
  const searchByValue = searchBy.value.toLowerCase();

  if (!objectValueAsString) return;

  switch (condition) {
    case "is":
      if (objectValueAsString === searchByValue) {
        return data;
      }
      break;
    case "not":
      if (objectValueAsString !== searchByValue) {
        return data;
      }
      break;
    case "contains":
      if (
        searchByValue.includes(objectValueAsString as string) ||
        (objectValueAsString as string).includes(searchByValue)
      ) {
        return data;
      }
      break;
    case "startsWith":
      if ((objectValueAsString as string).startsWith(searchByValue)) {
        return data;
      }
      break;
    case "doesntStartWith":
      if (!(objectValueAsString as string).startsWith(searchByValue)) {
        return data;
      }
      break;
    case "endsWith":
      if ((objectValueAsString as string).endsWith(searchByValue)) {
        return data;
      }
      break;
    case "doesntEndWith":
      if (!(objectValueAsString as string).endsWith(searchByValue)) {
        return data;
      }
      break;
    case "lt":
      if (Number(objectValueAsString) < Number(searchByValue)) {
        return data;
      }
      break;
    case "gt":
      if (Number(objectValueAsString) > Number(searchByValue)) {
        return data;
      }
      break;
    case "lte":
      if (Number(objectValueAsString) <= Number(searchByValue)) {
        return data;
      }
      break;
    case "gte":
      if (Number(objectValueAsString) >= Number(searchByValue)) {
        return data;
      }
      break;
    case "matches":
      if ((objectValueAsString as string).match(searchByValue)) {
        return data;
      }
      break;
    case "doesntMatch":
      if (!(objectValueAsString as string).match(searchByValue)) {
        return data;
      }
      break;
  }
};

export const filterConditions = [
  "is", //  Include if field is equal to value.
  "not", //  Include if field is not equal to value.
  "contains", //  Include if field contains value.
  "startsWith", //  Include if field value starts with the provided string.
  "endsWith", //  Include if field value ends with the provided string.
  "doesntStartWith", //  Include if field value does not start with the provided string.
  "doesntEndWith", //  Include if field value does not end with the provided string.
  "lt", //  Include if field value is less than the provided value.
  "gt", //  Include if field value is greater than the provided value.
  "lte", //  Include if field value is less than or equal to the provided value.
  "gte", //  Include if field value is greater than or equal to the provided value.
  "matches", //  Include if field value matches the provided regular expression.
  "doesntMatch", //  Include if field value does not match the provided regular expression.
] as const;

export const additionalFilters = [
  "limit", //  Limit the number of results returned.
  "offset", //  Skip the first n results.
  "fields", //  Only return the specified fields.
];

export type FilterCondition = (typeof filterConditions)[number];
export type AdditionalFilter = (typeof additionalFilters)[number];
