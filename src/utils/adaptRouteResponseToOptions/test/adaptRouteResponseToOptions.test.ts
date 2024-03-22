import adaptRouteResponseToOptions from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";
import { mockSingleObjectData, mockObjectData, mockArrayData } from "@/utils/adaptRouteResponseToOptions/test/mock";

describe("test Array", () => {
  test("fieldsAutocomplete", () => {
    const { data, route, output } = mockArrayData;
    const result = adaptRouteResponseToOptions(data, route);

    expect(result).toEqual(output);
  });

  test("test Object", () => {
    const { data, route, output } = mockObjectData;
    const result = adaptRouteResponseToOptions(data, route);

    expect(result).toEqual(output);
  });

  test("test SingleObject", () => {
    const { data, route, output } = mockSingleObjectData;
    const result = adaptRouteResponseToOptions(data, route);

    expect(result).toEqual(output);
  });
});
