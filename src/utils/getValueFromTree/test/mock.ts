import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

interface Mock {
  fomValues: JsonFormValue[] | unknown | undefined;
  key: string;
  output?: unknown;
}

const mockFormValuesIsArray: Mock = {
  fomValues: [
    {
      article: {
        mustBeCompleted: false,
        value: {
          id: "214",
          image: null,
          name: "Mini-Pelle 1T5 sur chenilles",
          options: [
            {
              articleName: "BRH",
              id: "28",
              image: null,
              isIncluded: false,
            },
            {
              articleName: "Benne Preneuse ",
              id: "29",
              image: null,
              isIncluded: false,
            },
          ],
        },
      },
      worksite: {
        mustBeCompleted: false,
        value: {
          id: "123",
          image: null,
          name: "Roissy",
          options: [
            {
              contact: "a",
              id: "1",
              image: null,
              isIncluded: false,
            },
            {
              contact: "b",
              id: "2",
              image: null,
              isIncluded: false,
            },
          ],
        },
      },
    },
  ],
  key: "article",
  output: {
    mustBeCompleted: false,
    value: {
      id: "214",
      image: null,
      name: "Mini-Pelle 1T5 sur chenilles",
      options: [
        { articleName: "BRH", id: "28", image: null, isIncluded: false },
        { articleName: "Benne Preneuse ", id: "29", image: null, isIncluded: false },
      ],
    },
  },
};

const mockFormValuesIsObject: Mock = {
  fomValues: {
    worksite: {
      mustBeCompleted: false,
      value: {
        id: "123",
        image: null,
        name: "Roissy",
        options: [
          {
            contact: "a",
            id: "1",
            image: null,
            isIncluded: false,
          },
        ],
      },
    },
  },
  key: "worksite",
  output: { id: "123", image: null, name: "Roissy", options: [{ contact: "a", id: "1", image: null, isIncluded: false }] },
};

export { mockFormValuesIsArray, mockFormValuesIsObject };
