import TreeNode from "@/types/TreeNode";

const basicExample: TreeNode = {
  attributes: {
    depth: 0,
    helperText: "Test",
    isLeaf: false,
    isRoot: true,
    label: "Test",
    name: "Test",
    type: "title",
  },
  children: [
    {
      attributes: {
        depth: 1,
        helperText: "Info",
        isLeaf: false,
        label: "Info",
        name: "Info",
        required: true,
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: false,
            label: "blabla",
            name: "mail",
            type: "email",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: false,
                label: "Titre 2",
                name: "Titre 2",
                type: "title",
              },
              children: [
                {
                  attributes: {
                    depth: 4,
                    isLeaf: false,
                    label: "champs",
                    name: "champs",
                    type: "text",
                  },
                  children: [
                    {
                      attributes: {
                        depth: 5,
                        isLeaf: false,
                        label: "blabla",
                        name: "blabla",
                        type: "text",
                      },
                      children: [
                        {
                          attributes: {
                            depth: 6,
                            isLeaf: false,
                            label: "blbala",
                            name: "blabla",
                            type: "text",
                          },
                          children: [
                            {
                              attributes: {
                                depth: 7,
                                isLeaf: false,
                                label: "blbala",
                                name: "blabla",
                                type: "title",
                              },
                              children: [
                                {
                                  attributes: {
                                    depth: 8,
                                    isLeaf: false,
                                    label: "blabakl",
                                    name: "blabla",
                                    type: "text",
                                  },
                                  children: [
                                    {
                                      attributes: {
                                        depth: 9,
                                        isLeaf: true,
                                        label: "bajz",
                                        name: "blablab ",
                                        type: "text",
                                      },
                                      children: [],
                                      uuid: "17266706503090t6ph17375843.799999997",
                                    },
                                  ],
                                  uuid: "1726670642162wafgp8f367696.59999999404",
                                },
                              ],
                              uuid: "1726670633241pqrrs6z358775.299999997",
                            },
                          ],
                          uuid: "1726670594211ch6ecxx319745.40000000596",
                        },
                      ],
                      uuid: "17266705840754dn40j5309609.299999997",
                    },
                  ],
                  uuid: "1726493786700x3lv09p43845.10000000149",
                },
              ],
              uuid: "1726493775404wjpmbdx32548.70000000298",
            },
          ],
          uuid: "1726670319964uvkrfak45497.90000000596",
        },
      ],
      uuid: "1726474285157tkqourv30657.59999999404",
    },
  ],
  uuid: "1726474271061htc22oi16561.79999998212",
};

export default basicExample;
