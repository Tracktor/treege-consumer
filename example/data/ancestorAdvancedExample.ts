import type { TreeNode } from "@tracktor/types-treege";

const ancestorAdvancedExample: TreeNode = {
  attributes: {
    depth: 0,
    isLeaf: false,
    isRoot: true,
    label: "worksite",
    name: "worksite",
    type: "select",
    values: [
      {
        id: "0",
        label: "DIVERS CHANTIER - B09X.208689",
        value: "7376",
      },
    ],
  },
  children: [
    {
      attributes: {
        defaultValueFromAncestor: {
          uuid: "1750111362072v5cwq148814028.5",
        },
        depth: 1,
        isLeaf: false,
        label: "api worksite",
        name: "api worksite",
        route: {
          params: [
            {
              ancestorUuid: "1750111362072v5cwq148814028.5",
              id: "1",
              key: "{worksite_id}",
              useAncestorValue: true,
            },
          ],
          pathKey: {
            label: "name",
            value: "id",
          },
          url: "https://app.api.dev.tracktor.fr/v2/worksites/{worksite_id}",
        },
        type: "dynamicSelect",
      },
      children: [
        {
          attributes: {
            defaultValueFromAncestor: {
              sourceValue: "hourConstraints",
              uuid: "1750111409376oo9z1zj8861332.5",
            },
            depth: 2,
            isLeaf: false,
            label: "hours constraint",
            name: "hours_constraint",
            type: "timeRange",
          },
          children: [
            {
              attributes: {
                defaultValueFromAncestor: {
                  sourceValue: "latitude",
                  uuid: "1750111409376oo9z1zj8861332.5",
                },
                depth: 3,
                isLeaf: false,
                label: "latitude",
                name: "latitude",
                type: "text",
              },
              children: [
                {
                  attributes: {
                    defaultValueFromAncestor: {
                      sourceValue: "longitude",
                      uuid: "1750111409376oo9z1zj8861332.5",
                    },
                    depth: 4,
                    isLeaf: false,
                    label: "longitude",
                    name: "longitude",
                    type: "text",
                  },
                  children: [
                    {
                      attributes: {
                        defaultValueFromAncestor: {
                          sourceValue: "address",
                          uuid: "1750111409376oo9z1zj8861332.5",
                        },
                        depth: 5,
                        isLeaf: false,
                        label: "address",
                        name: "address",
                        type: "address",
                      },
                      children: [
                        {
                          attributes: {
                            depth: 6,
                            isLeaf: false,
                            label: "booking_ids",
                            name: "booking_ids",
                            type: "select",
                            values: [
                              {
                                id: "0",
                                label: "test 1 - waiting",
                                value: "12124",
                              },
                              {
                                id: "1",
                                label: "test 2 - started",
                                value: "11322",
                              },
                              {
                                id: "2",
                                label: "test 3 - ended",
                                value: "11805",
                              },
                            ],
                          },
                          children: [
                            {
                              attributes: {
                                depth: 7,
                                isLeaf: false,
                                label: "booking id",
                                name: "booking_api",
                                route: {
                                  params: [
                                    {
                                      ancestorUuid: "1750146335543o5epyd47205216.800000012",
                                      id: "1",
                                      key: "{booking_id}",
                                      useAncestorValue: true,
                                    },
                                  ],
                                  pathKey: {
                                    label: "id",
                                    value: "id",
                                  },
                                  url: "https://app.api.dev.tracktor.fr/v2/bookings/{booking_id}",
                                },
                                type: "dynamicSelect",
                              },
                              children: [
                                {
                                  attributes: {
                                    defaultValueFromAncestor: {
                                      sourceValue: "totalPrice",
                                      uuid: "17501464061701hl8ipd7275835.400000006",
                                    },
                                    depth: 8,
                                    isLeaf: false,
                                    label: "total_price",
                                    name: "total_price",
                                    type: "number",
                                  },
                                  children: [
                                    {
                                      attributes: {
                                        defaultValueFromAncestor: {
                                          sourceValue: "fromDate",
                                          uuid: "17501464061701hl8ipd7275835.400000006",
                                        },
                                        depth: 9,
                                        isLeaf: false,
                                        label: "from date",
                                        name: "fromDate",
                                        type: "date",
                                      },
                                      children: [
                                        {
                                          attributes: {
                                            defaultValueFromAncestor: {
                                              sourceValue: "status",
                                              uuid: "17501464061701hl8ipd7275835.400000006",
                                            },
                                            depth: 10,
                                            isDecision: true,
                                            isLeaf: false,
                                            label: "booking status",
                                            name: "booking_status",
                                            type: "radio",
                                          },
                                          children: [
                                            {
                                              attributes: {
                                                depth: 11,
                                                label: "started",
                                                name: "booking_status:started",
                                                value: "started",
                                              },
                                              children: [
                                                {
                                                  attributes: {
                                                    defaultValueFromAncestor: {
                                                      sourceValue: "locked",
                                                      uuid: "17501464061701hl8ipd7275835.400000006",
                                                    },
                                                    depth: 12,
                                                    isLeaf: false,
                                                    label: "is locked",
                                                    name: "locked",
                                                    type: "switch",
                                                  },
                                                  children: [
                                                    {
                                                      attributes: {
                                                        defaultValueFromAncestor: {
                                                          uuid: "17501467660751ez0ll67635737.800000012",
                                                        },
                                                        depth: 13,
                                                        isLeaf: false,
                                                        label: "is locked locked ?",
                                                        name: "isLockedLocked",
                                                        type: "checkbox",
                                                      },
                                                      children: [
                                                        {
                                                          attributes: {
                                                            depth: 14,
                                                            isLeaf: false,
                                                            label: "dateRange",
                                                            name: "dateRange",
                                                            type: "dateRange",
                                                          },
                                                          children: [
                                                            {
                                                              attributes: {
                                                                defaultValueFromAncestor: {
                                                                  uuid: "1750230358049kk5qtk450118",
                                                                },
                                                                depth: 15,
                                                                isLeaf: true,
                                                                label: "ancestor dateRange",
                                                                name: "ancestor dateRange",
                                                                type: "dateRange",
                                                              },
                                                              children: [],
                                                              uuid: "1750230389799d5gu87v81868.59999999404",
                                                            },
                                                          ],
                                                          uuid: "1750230358049kk5qtk450118",
                                                        },
                                                      ],
                                                      uuid: "1750154142640sfbr8o615012278.800000012",
                                                    },
                                                  ],
                                                  uuid: "17501467660751ez0ll67635737.800000012",
                                                },
                                              ],
                                              uuid: "17501482012951wpoggs9070953.400000006:started",
                                            },
                                            {
                                              attributes: {
                                                depth: 11,
                                                label: "ended",
                                                name: "booking_status:ended",
                                                value: "ended",
                                              },
                                              children: [
                                                {
                                                  attributes: {
                                                    defaultValueFromAncestor: {
                                                      sourceValue: "toDate",
                                                      uuid: "17501464061701hl8ipd7275835.400000006",
                                                    },
                                                    depth: 12,
                                                    isLeaf: false,
                                                    label: "to date",
                                                    name: "to_date",
                                                    type: "date",
                                                  },
                                                  children: [
                                                    {
                                                      attributes: {
                                                        defaultValueFromAncestor: {
                                                          uuid: "1750146835892mfsm7gj7705554.5",
                                                        },
                                                        depth: 13,
                                                        isLeaf: false,
                                                        label: "date from to date",
                                                        name: "dateFromToDate",
                                                        type: "date",
                                                      },
                                                      children: [
                                                        {
                                                          attributes: {
                                                            depth: 14,
                                                            isLeaf: false,
                                                            label: "time",
                                                            name: "time",
                                                            type: "time",
                                                          },
                                                          children: [
                                                            {
                                                              attributes: {
                                                                defaultValueFromAncestor: {
                                                                  uuid: "1750231119394yshz1ic811468.1999999881",
                                                                },
                                                                depth: 15,
                                                                isLeaf: true,
                                                                label: "ancestor time",
                                                                name: "ancestor time",
                                                                type: "time",
                                                              },
                                                              children: [],
                                                              uuid: "1750231174364wwj0w6m866438.400000006",
                                                            },
                                                          ],
                                                          uuid: "1750231119394yshz1ic811468.1999999881",
                                                        },
                                                      ],
                                                      uuid: "17501611241314bjsjq721993748.900000006",
                                                    },
                                                  ],
                                                  uuid: "1750146835892mfsm7gj7705554.5",
                                                },
                                              ],
                                              uuid: "17501482012951wpoggs9070953.400000006:ended",
                                            },
                                            {
                                              attributes: {
                                                depth: 11,
                                                label: "waiting_for_confirmation",
                                                name: "booking_status:waiting_for_confirmation",
                                                value: "waiting_for_confirmation",
                                              },
                                              children: [
                                                {
                                                  attributes: {
                                                    depth: 12,
                                                    isLeaf: false,
                                                    label: "comment",
                                                    name: "comment",
                                                    type: "text",
                                                  },
                                                  children: [
                                                    {
                                                      attributes: {
                                                        defaultValueFromAncestor: {
                                                          sourceValue: "entityId",
                                                          uuid: "1750111409376oo9z1zj8861332.5",
                                                        },
                                                        depth: 13,
                                                        isLeaf: false,
                                                        label: "entities",
                                                        name: "entities",
                                                        type: "select",
                                                        values: [
                                                          {
                                                            id: "0",
                                                            label: "entité Mickey",
                                                            value: "21134",
                                                          },
                                                          {
                                                            id: "1",
                                                            label: "entité Toto",
                                                            value: "12345",
                                                          },
                                                        ],
                                                      },
                                                      children: [
                                                        {
                                                          attributes: {
                                                            depth: 14,
                                                            isLeaf: false,
                                                            label: "timeRange",
                                                            name: "timeRange",
                                                            type: "timeRange",
                                                          },
                                                          children: [
                                                            {
                                                              attributes: {
                                                                defaultValueFromAncestor: {
                                                                  uuid: "1750231882326hz1k4jd1574404.5",
                                                                },
                                                                depth: 15,
                                                                isLeaf: true,
                                                                label: "timeRange from timeRange",
                                                                name: "timeRange from timeRange",
                                                                type: "timeRange",
                                                              },
                                                              children: [],
                                                              uuid: "1750231893995cuhe4ee1586074.400000006",
                                                            },
                                                          ],
                                                          uuid: "1750231882326hz1k4jd1574404.5",
                                                        },
                                                      ],
                                                      uuid: "17501829708732o1juyq13065393.699999988",
                                                    },
                                                  ],
                                                  uuid: "1750146867397f4jyqgz7737060.099999994",
                                                },
                                              ],
                                              uuid: "17501482012951wpoggs9070953.400000006:waiting_for_confirmation",
                                            },
                                          ],
                                          uuid: "175014661302581erpmc7482688.5",
                                        },
                                      ],
                                      uuid: "17501465165027xt5mef7386165.400000006",
                                    },
                                  ],
                                  uuid: "1750146448408h0zid0m7318071.800000012",
                                },
                              ],
                              uuid: "17501464061701hl8ipd7275835.400000006",
                            },
                          ],
                          uuid: "1750146335543o5epyd47205216.800000012",
                        },
                      ],
                      uuid: "1750145689210vsrh6x06558883.5",
                    },
                  ],
                  uuid: "17501145638286rjen1n596513.8000000119",
                },
              ],
              uuid: "1750114319367la53bqv352053.8000000119",
            },
          ],
          uuid: "1750111564885agn7qos9016840.599999994",
        },
      ],
      uuid: "1750111409376oo9z1zj8861332.5",
    },
  ],
  uuid: "1750111362072v5cwq148814028.5",
};

export default ancestorAdvancedExample;
