const ancestorTest1 = {
  attributes: {
    depth: 0,
    isLeaf: false,
    isRoot: true,
    label: "article type",
    name: "article type",
    type: "select",
    values: [
      {
        id: "0",
        label: "machine",
        value: "machine",
      },
      {
        id: "1",
        label: "option",
        value: "option",
      },
    ],
  },
  children: [
    {
      attributes: {
        defaultValueFromAncestor: {
          sourceValue: "",
          useSourceValueAsAPIParam: true,
          uuid: "1749816982537vbnif4e1566.1999998092651",
        },
        depth: 1,
        isLeaf: true,
        label: "first filter",
        name: "first filter",
        route: {
          params: [
            {
              id: "1",
              key: "onlyParents",
              value: "true",
            },
          ],
          pathKey: {
            label: "name",
            value: "id",
          },
          searchKey: "text",
          url: "https://app.api.dev.tracktor.fr/v2/search/categories?articleType[]={{}}",
        },
        type: "autocomplete",
        useSourceValueAsAPIParam: true,
      },
      children: [],
      uuid: "1749817093387pygyv9y112415.09999990463",
    },
  ],
  uuid: "1749816982537vbnif4e1566.1999998092651",
};

export default ancestorTest1;
