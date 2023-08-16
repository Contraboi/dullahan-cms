export default function accessObjectValueAsString<T, K extends keyof T>(
  object: T,
  accessString: string
) {
  for (const key of accessString.split(".")) {
    if (object[key as K] === undefined) {
      return undefined;
    }
    object = object[key as K] as T;
  }

  return object as T;
}
