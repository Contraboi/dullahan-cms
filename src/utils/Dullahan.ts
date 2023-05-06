export type Data<T> = {
    data: Array<T>;
    meta: MetaData;
    links: {
        first: string;
        last: string;
        prev: string | null;
    };
};
export type MetaData = {
    currentPage: number;
    from: number;
    lastPage: number;
    links: Array<{
        url: string;
        label: number;
        active: boolean;
    }>;
    path: string;
    perPage: number;
    to: number;
    total: number;
};
/**
 *  ### This is wrapper class around Dullahan REST API.
 *
 * @type TCollection - The list of collection as literal string type e.g blog | page.
 *
 * @example
 * const collections = ["blog", "page"] as const;
 * type Collection = typeof collections[number];
 *
 * class Dullahanche<T> extends Dullahan<T, Collection> {
 *     constructor() {
 *      super("https://dullahan,com/api/");
 * }
 */
export abstract class Dullahan<
    TBlueprint,
    TCollection extends string,
> {
    protected query: string = "";
    protected constructor(url: string) {
        this.query = url;
    }
    collection(collection: TCollection) {
        this.query += `collections/${collection}/entries?`;
        return new StatamicUtility<TBlueprint, TCollection>(this.query);
    }
}
class StatamicUtility<
    TBlueprint,
    TCollection extends string,
> {
    protected query: string = "";
    constructor(url: string) {
        this.query = url;
    }
    filter(
        by: keyof TBlueprint,
        condition: FilterCondition,
        value: string
    ) {
        this.query += `filter[${this.buildString(by)}:${condition}]=${value}&`;
        return this;
    }

    private buildString(value: keyof TBlueprint | string | Array<keyof TBlueprint | string>) {
        let valueString = typeof value === "string" ? value : "";
        if (Array.isArray(value)) valueString = value.join(",");
        return convertFromCamelCaseToSnakeCase(valueString);
    }
    private async fetch() {
        // Prints the request to the console with purple color
        //\x1b[35m" is the color code for purple
        //\x1b[34m" is the color code for blue
        //\x1b[0m" is the color code for reset
        if (typeof window === "undefined") {
            console.log("\x1b[35m", "Statamic Request: ", "\x1b[34m", this.query, "\x1b[0m");
        }
        const response = await fetch(this.query);
        return  await response.json() as Data<TBlueprint> | undefined;
    }
}
const convertFromCamelCaseToSnakeCase = (value: string) => {
    return value.replace(/([A-Z])/g, "_$1").toLowerCase();
};
type FilterCondition =
    | "is" // Include if field is equal to value.
    | "not" // Include if field is not equal to value.
    | "contains" // Include if field contains value.
    | "exists" // Include if field exists.
    | "doesnt_exist" // Include if field does not exist.
    | "doesnt_contain" // Include if field does not contain value.
    | "in" // Include if field value is in the provided array.
    | "not_in" // Include if field value is not in the provided array.
    | "starts_with" // Include if field value starts with the provided string.
    | "ends_with" // Include if field value ends with the provided string.
    | "doesnt_start_with" // Include if field value does not start with the provided string.
    | "doesnt_end_with" // Include if field value does not end with the provided string.
    | "lt" // Include if field value is less than the provided value.
    | "gt" // Include if field value is greater than the provided value.
    | "lte" // Include if field value is less than or equal to the provided value.
    | "gte" // Include if field value is greater than or equal to the provided value.
    | "matches" // Include if field value matches the provided regular expression.
    | "doesnt_match" // Include if field value does not match the provided regular expression.
    | "is_alpha" // Include if field value is alphabetic.
    | "is_numeric" // Include if field value is numeric.
    | "is_alpha_numeric" // Include if field value is alphanumeric.
    | "is_url" // Include if field value is a URL.
    | "is_email" // Include if field value is an email address.
    | "is_after" // Include if field value is after the provided date.
    | "is_before" // Include if field value is before the provided date.
    | "is_numberwang"; // Include if field value is number-wang.