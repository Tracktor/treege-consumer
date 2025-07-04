import { isObject, isArray } from "@tracktor/react-utils";
import type { Route } from "@tracktor/types-treege";

type Item = {
  id: string;
  [key: string]: unknown;
};

export type Option = {
  imageUri?: string;
  id?: string;
  label?: string;
  value?: string;
  rawData?: unknown;
};

const isData = (obj: unknown): obj is { [key: string]: string } => isObject(obj) && obj !== null;

/**
 * Adapt route response to options
 * @param data
 * @param route
 */
const adaptRouteResponseToOptions = (data: unknown, route?: Route): Option[] | undefined => {
  // get autoComplete Options
  if (isArray(data)) {
    return data.map((item) => {
      const mappedLabel = item[String(route?.pathKey?.label)];
      const mappedValue = route?.pathKey?.value ? item[String(route?.pathKey?.value)] : item;
      const mappedImage = item[String(route?.pathKey?.image)];

      return {
        id: item.id,
        imageUri: mappedImage,
        label: mappedLabel,
        rawData: item,
        value: mappedValue,
      };
    });
  }

  if (isObject(data) && data !== null && route?.pathKey?.object !== undefined) {
    const objectData = data as { [key: string]: unknown };
    const arrayData = objectData[route.pathKey.object] as Item[];

    if (isArray(arrayData)) {
      return arrayData.map((item: Item) => {
        const mappedLabel = route?.pathKey?.label && String(item[route?.pathKey?.label]);
        const mappedValue = route?.pathKey?.value && String(item[route?.pathKey?.value]);
        let mappedImage = route?.pathKey?.image && String(item[route?.pathKey?.image]);

        if (mappedImage === "null") {
          mappedImage = undefined;
        }

        return {
          id: item.id,
          imageUri: mappedImage,
          label: mappedLabel,
          rawData: item,
          value: mappedValue,
        };
      });
    }
  }

  if (isObject(data) && data !== null) {
    const mappedImage = isData(data) ? data[route?.pathKey?.image || ""] : undefined;
    const mappedLabel = isData(data) ? data[route?.pathKey?.label || ""] : undefined;
    const mappedValue = isData(data) ? data[route?.pathKey?.value || ""] : undefined;
    return [
      {
        id: "id" in data ? String(data.id) : "",
        imageUri: mappedImage,
        label: mappedLabel,
        rawData: data,
        value: mappedValue,
      },
    ];
  }

  return undefined;
};

export default adaptRouteResponseToOptions;
