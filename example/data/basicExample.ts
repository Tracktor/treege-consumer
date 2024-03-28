const basicExample = {
  attributes: {
    depth: 0,
    isLeaf: false,
    isRoot: true,
    label: "text",
    type: "text",
  },
  children: [
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "select",
        type: "select",
        values: [
          {
            id: "0",
            label: "1",
            value: "1",
          },
          {
            id: "1",
            label: "2",
            value: "2",
          },
        ],
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: false,
            label: "date",
            type: "date",
          },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: false,
                label: "radio",
                type: "radio",
                values: [
                  {
                    id: "0",
                    label: "qw",
                    value: "qw",
                  },
                  {
                    id: "1",
                    label: "as",
                    value: "as",
                  },
                ],
              },
              children: [
                {
                  attributes: {
                    depth: 4,
                    isLeaf: false,
                    label: "switch",
                    type: "switch",
                  },
                  children: [
                    {
                      attributes: {
                        depth: 5,
                        isLeaf: false,
                        label: "timerange",
                        type: "timeRange",
                      },
                      children: [
                        {
                          attributes: {
                            depth: 6,
                            isLeaf: false,
                            label: "daterange",
                            type: "dateRange",
                          },
                          children: [
                            {
                              attributes: {
                                depth: 7,
                                isLeaf: false,
                                label: "adresse",
                                type: "address",
                              },
                              children: [
                                {
                                  attributes: {
                                    depth: 8,
                                    isLeaf: false,
                                    label: "time",
                                    type: "time",
                                  },
                                  children: [
                                    {
                                      attributes: {
                                        depth: 9,
                                        hiddenValue: "hidden",
                                        isLeaf: false,
                                        label: "hiddenField",
                                        type: "hidden",
                                      },
                                      children: [
                                        {
                                          attributes: {
                                            depth: 10,
                                            initialQuery: true,
                                            isLeaf: true,
                                            label: "autocomplete",
                                            route: {
                                              pathKey: {
                                                image: "img",
                                                label: "name",
                                                value: "id",
                                              },
                                              searchKey: "text",
                                              url: " https://client.api.dev.tracktor.fr/v2/search/articles",
                                            },
                                            type: "autocomplete",
                                          },
                                          children: [],
                                          name: "autocomplete",
                                        },
                                      ],
                                      name: "hiddenField",
                                    },
                                  ],
                                  name: "time",
                                },
                              ],
                              name: "adresse",
                            },
                          ],
                          name: "daterange",
                        },
                      ],
                      name: "timerange",
                    },
                  ],
                  name: "switch",
                },
              ],
              name: "radio",
            },
          ],
          name: "date",
        },
      ],
      name: "select",
    },
  ],
  name: "text",
};

export default basicExample;
