import type { Route } from "@tracktor/types-treege";
import { Option } from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";

type Mock = {
  data: unknown;
  route: Route;
  output: Option[];
};

const mockArrayData: Mock = {
  data: [
    {
      id: "1",
      imageUrl: "image1.jpg",
      name: "Item 1",
    },
    {
      id: "2",
      imageUrl: "image2.jpg",
      name: "Item 2",
    },
  ],
  output: [
    {
      id: "1",
      imageUri: "image1.jpg",
      label: "Item 1",
      raw: {
        id: "1",
        imageUrl: "image1.jpg",
        name: "Item 1",
      },
      value: "1",
    },
    {
      id: "2",
      imageUri: "image2.jpg",
      label: "Item 2",
      raw: {
        id: "2",
        imageUrl: "image2.jpg",
        name: "Item 2",
      },
      value: "2",
    },
  ],
  route: {
    pathKey: {
      image: "imageUrl",
      label: "name",
      value: "id",
    },
  },
};

const mockObjectData: Mock = {
  data: {
    parentObject: [
      { id: "1", imageUrl: "image1.jpg", name: "Item 1" },
      { id: "2", imageUrl: "image2.jpg", name: "Item 2" },
    ],
  },
  output: [
    {
      id: "1",
      imageUri: "image1.jpg",
      label: "Item 1",
      raw: {
        id: "1",
        imageUrl: "image1.jpg",
        name: "Item 1",
      },
      value: "1",
    },
    {
      id: "2",
      imageUri: "image2.jpg",
      label: "Item 2",
      raw: {
        id: "2",
        imageUrl: "image2.jpg",
        name: "Item 2",
      },
      value: "2",
    },
  ],
  route: {
    pathKey: {
      image: "imageUrl",
      label: "name",
      object: "parentObject",
      value: "id",
    },
  },
};

const mockSingleObjectData: Mock = {
  data: { id: "1", imageUrl: "image1.jpg", name: "Item 1" },
  output: [{ id: "1", imageUri: "image1.jpg", label: "Item 1", raw: { id: "1", imageUrl: "image1.jpg", name: "Item 1" }, value: "1" }],
  route: {
    pathKey: {
      image: "imageUrl",
      label: "name",
      value: "id",
    },
  },
};

export { mockArrayData, mockObjectData, mockSingleObjectData };
