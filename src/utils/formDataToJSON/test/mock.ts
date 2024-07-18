import { FieldValues } from "@/types/FieldValues";
import { JsonFormValue } from "@/types/JsonFormValue";
import TreeNode from "@/types/TreeNode";

interface Mock {
  fields: TreeNode[];
  fieldValues: FieldValues;
  output: JsonFormValue[];
}
const formWithTextFields: Mock = {
  fields: [
    {
      attributes: {
        depth: 0,
        isLeaf: false,
        isRoot: true,
        label: "Nom",
        name: "last_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: true,
            label: "Prénom",
            name: "first_name",
            type: "text",
          },
          children: [],
          uuid: "first_name",
        },
      ],
      uuid: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: true,
        label: "Prénom",
        name: "first_name",
        type: "text",
      },
      children: [],
      uuid: "first_name",
    },
  ],
  fieldValues: {
    first_name: "John",
    last_name: "Doe",
  },
  output: [
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
  ],
};

const formWithSelectFields: Mock = {
  fields: [
    {
      attributes: {
        depth: 0,
        isLeaf: false,
        isRoot: true,
        label: "Nom",
        name: "last_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "Prénom",
            name: "first_name",
            type: "text",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: true,
                label: "Sexe",
                name: "gender",
                type: "select",
                values: [
                  {
                    id: "0",
                    label: "Homme",
                    value: "male",
                  },
                  {
                    id: "1",
                    label: "Femme",
                    value: "female",
                  },
                ],
              },
              children: [],
              uuid: "gender",
            },
          ],
          uuid: "first_name",
        },
      ],
      uuid: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "Prénom",
        name: "first_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            label: "Sexe",
            name: "gender",
            type: "select",
            values: [
              {
                id: "0",
                label: "Homme",
                value: "male",
              },
              {
                id: "1",
                label: "Femme",
                value: "female",
              },
            ],
          },
          children: [],
          uuid: "gender",
        },
      ],
      uuid: "first_name",
    },
    {
      attributes: {
        depth: 2,
        isLeaf: true,
        label: "Sexe",
        name: "gender",
        type: "select",
        values: [
          {
            id: "0",
            label: "Homme",
            value: "male",
          },
          {
            id: "1",
            label: "Femme",
            value: "female",
          },
        ],
      },
      children: [],
      uuid: "gender",
    },
  ],
  fieldValues: {
    first_name: "John",
    gender: "male",
    last_name: "Doe",
  },
  output: [
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
    { label: "Sexe", name: "gender", type: "select", value: { label: "Homme", value: "male" } },
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
  ],
};

const formWithRadioFields: Mock = {
  fields: [
    {
      attributes: {
        depth: 0,
        isLeaf: false,
        isRoot: true,
        label: "Nom",
        name: "last_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "Prénom",
            name: "first_name",
            type: "text",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: true,
                label: "Sexe",
                name: "gender",
                type: "radio",
                values: [
                  {
                    id: "0",
                    label: "Homme",
                    value: "male",
                  },
                  {
                    id: "1",
                    label: "Femme",
                    value: "female",
                  },
                ],
              },
              children: [],
              uuid: "gender",
            },
          ],
          uuid: "first_name",
        },
      ],
      uuid: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "Prénom",
        name: "first_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            label: "Sexe",
            name: "gender",
            type: "radio",
            values: [
              {
                id: "0",
                label: "Homme",
                value: "male",
              },
              {
                id: "1",
                label: "Femme",
                value: "female",
              },
            ],
          },
          children: [],
          uuid: "gender",
        },
      ],
      uuid: "first_name",
    },
    {
      attributes: {
        depth: 2,
        isLeaf: true,
        label: "Sexe",
        name: "gender",
        type: "radio",
        values: [
          {
            id: "0",
            label: "Homme",
            value: "male",
          },
          {
            id: "1",
            label: "Femme",
            value: "female",
          },
        ],
      },
      children: [],
      uuid: "gender",
    },
  ],
  fieldValues: {
    first_name: "John",
    gender: "male",
    last_name: "Doe",
  },
  output: [
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
    { label: "Sexe", name: "gender", type: "radio", value: { label: "Homme", value: "male" } },
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
  ],
};

const formWithSwitchFields: Mock = {
  fields: [
    {
      attributes: {
        depth: 0,
        isLeaf: false,
        isRoot: true,
        label: "Nom",
        name: "last_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "Prénom",
            name: "first_name",
            type: "text",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: true,
                isRoot: false,
                label: "Administrateur",
                name: "admin",
                type: "switch",
              },
              children: [],
              uuid: "admin",
            },
          ],
          uuid: "first_name",
        },
      ],
      uuid: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "Prénom",
        name: "first_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            isRoot: false,
            label: "Administrateur",
            name: "admin",
            type: "switch",
          },
          children: [],
          uuid: "admin",
        },
      ],
      uuid: "first_name",
    },
    {
      attributes: {
        depth: 2,
        isLeaf: true,
        isRoot: false,
        label: "Administrateur",
        name: "admin",
        type: "switch",
      },
      children: [],
      uuid: "admin",
    },
  ],
  fieldValues: {
    admin: true,
    first_name: "John",
    last_name: "Doe",
  },
  output: [
    { label: "Administrateur", name: "admin", type: "switch", value: true },
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
  ],
};

const formWithCheckboxFields: Mock = {
  fields: [
    {
      attributes: {
        depth: 0,
        isLeaf: false,
        isRoot: true,
        label: "Nom",
        name: "last_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "Prénom",
            name: "first_name",
            type: "text",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: true,
                isRoot: false,
                label: "Administrateur",
                name: "admin",
                type: "switch",
              },
              children: [],
              uuid: "admin",
            },
          ],
          uuid: "first_name",
        },
      ],
      uuid: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "Prénom",
        name: "first_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            isRoot: false,
            label: "Administrateur",
            name: "admin",
            type: "switch",
          },
          children: [],
          uuid: "admin",
        },
      ],
      uuid: "first_name",
    },
    {
      attributes: {
        depth: 2,
        isLeaf: true,
        isRoot: false,
        label: "Administrateur",
        name: "admin",
        type: "checkbox",
      },
      children: [],
      uuid: "admin",
    },
  ],
  fieldValues: {
    admin: true,
    first_name: "John",
    last_name: "Doe",
  },
  output: [
    { label: "Administrateur", name: "admin", type: "checkbox", value: true },
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
  ],
};

const formWithDecisionFields: Mock = {
  fields: [
    {
      attributes: {
        depth: 0,
        isLeaf: false,
        isRoot: true,
        label: "Nom",
        name: "last_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "Prénom",
            name: "first_name",
            type: "text",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isDecision: true,
                isLeaf: false,
                isRoot: false,
                label: "Type d'evenement",
                name: "event_type",
                type: "select",
              },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: false,
                    label: "Incident",
                    name: "Incident",
                    value: "incident",
                  },
                  children: [
                    {
                      attributes: {
                        depth: 4,
                        isLeaf: true,
                        label: "Type d'incident",
                        name: "incident_type",
                        type: "text",
                      },
                      children: [],
                      uuid: "incident_type",
                    },
                  ],
                  uuid: "event_type:incident",
                },
                {
                  attributes: {
                    depth: 3,
                    isLeaf: false,
                    label: "other",
                    name: "other",
                    value: "other",
                  },
                  children: [
                    {
                      attributes: {
                        depth: 4,
                        isLeaf: true,
                        label: "Autre événement",
                        name: "Autre événement",
                        type: "text",
                      },
                      children: [],
                      uuid: "other_event",
                    },
                  ],
                  uuid: "event_type:other",
                },
              ],
              uuid: "event_type",
            },
          ],
          uuid: "first_name",
        },
      ],
      uuid: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "Prénom",
        name: "first_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isDecision: true,
            isLeaf: false,
            isRoot: false,
            label: "Type d'evenement",
            name: "event_type",
            type: "select",
          },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: false,
                label: "Incident",
                name: "Incident",
                value: "incident",
              },
              children: [
                {
                  attributes: {
                    depth: 4,
                    isLeaf: true,
                    label: "Type d'incident",
                    name: "incident_type",
                    type: "text",
                  },
                  children: [],
                  uuid: "incident_type",
                },
              ],
              uuid: "event_type:incident",
            },
            {
              attributes: {
                depth: 3,
                isLeaf: false,
                label: "other",
                name: "other",
                value: "other",
              },
              children: [
                {
                  attributes: {
                    depth: 4,
                    isLeaf: true,
                    label: "Autre événement",
                    name: "Autre événement",
                    type: "text",
                  },
                  children: [],
                  uuid: "other_event",
                },
              ],
              uuid: "event_type:other",
            },
          ],
          uuid: "event_type",
        },
      ],
      uuid: "first_name",
    },
    {
      attributes: {
        depth: 2,
        isDecision: true,
        isLeaf: false,
        isRoot: false,
        label: "Type d'evenement",
        name: "event_type",
        type: "select",
      },
      children: [
        {
          attributes: {
            depth: 3,
            isLeaf: false,
            label: "Incident",
            name: "Incident",
            value: "incident",
          },
          children: [
            {
              attributes: {
                depth: 4,
                isLeaf: true,
                label: "Type d'incident",
                name: "incident_type",
                type: "text",
              },
              children: [],
              uuid: "incident_type",
            },
          ],
          uuid: "event_type:incident",
        },
        {
          attributes: {
            depth: 3,
            isLeaf: false,
            label: "other",
            name: "other",
            value: "other",
          },
          children: [
            {
              attributes: {
                depth: 4,
                isLeaf: true,
                label: "Autre événement",
                name: "Autre événement",
                type: "text",
              },
              children: [],
              uuid: "other_event",
            },
          ],
          uuid: "event_type:other",
        },
      ],
      uuid: "event_type",
    },
    {
      attributes: {
        depth: 4,
        isLeaf: true,
        label: "Type d'incident",
        name: "incident_type",
        type: "text",
      },
      children: [],
      uuid: "incident_type",
    },
  ],
  fieldValues: {
    event_type: "incident",
    first_name: "John",
    incident_type: "Incendie ",
    last_name: "Doe",
  },
  output: [
    {
      label: "Type d'evenement",
      name: "event_type",
      type: "select",
      value: { label: "Incident", value: "incident" },
    },
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
    {
      label: "Type d'incident",
      name: "incident_type",
      type: "text",
      value: "Incendie ",
    },
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
  ],
};

const formWithTagFields: Mock = {
  fields: [
    {
      attributes: {
        depth: 0,
        isLeaf: false,
        isRoot: true,
        label: "Nom",
        name: "last_name",
        tag: "last_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: true,
            label: "Prénom",
            name: "first_name",
            type: "text",
          },
          children: [],
          uuid: "first_name",
        },
      ],
      uuid: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: true,
        label: "Prénom",
        name: "first_name",
        type: "text",
      },
      children: [],
      uuid: "first_name",
    },
  ],
  fieldValues: {
    first_name: "John",
    last_name: "Doe",
  },
  output: [
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
    { label: "Nom", name: "last_name", tag: "last_name", type: "text", value: "Doe" },
  ],
};

const formWithTextFieldsUndefined: Mock = {
  fields: [
    {
      attributes: {
        depth: 0,
        isLeaf: false,
        isRoot: true,
        label: "Nom",
        name: "last_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: true,
            label: "Prénom",
            name: "first_name",
            type: "text",
          },
          children: [],
          uuid: "first_name",
        },
      ],
      uuid: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: true,
        label: "Prénom",
        name: "first_name",
        type: "text",
      },
      children: [],
      uuid: "first_name",
    },
  ],
  fieldValues: {
    first_name: "",
    last_name: "Doe",
  },
  output: [
    { label: "Prénom", name: "first_name", type: "text", value: "" },
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
  ],
};

const formWithSelectFieldsUndefined: Mock = {
  fields: [
    {
      attributes: {
        depth: 0,
        isLeaf: false,
        isRoot: true,
        label: "Nom",
        name: "last_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "Prénom",
            name: "first_name",
            type: "text",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: true,
                label: "Sexe",
                name: "gender",
                type: "select",
                values: [
                  {
                    id: "0",
                    label: "Homme",
                    value: "male",
                  },
                  {
                    id: "1",
                    label: "Femme",
                    value: "female",
                  },
                ],
              },
              children: [],
              uuid: "gender",
            },
          ],
          uuid: "first_name",
        },
      ],
      uuid: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "Prénom",
        name: "first_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            label: "Sexe",
            name: "gender",
            type: "select",
            values: [
              {
                id: "0",
                label: "Homme",
                value: "male",
              },
              {
                id: "1",
                label: "Femme",
                value: "female",
              },
            ],
          },
          children: [],
          uuid: "gender",
        },
      ],
      uuid: "first_name",
    },
    {
      attributes: {
        depth: 2,
        isLeaf: true,
        label: "Sexe",
        name: "gender",
        type: "select",
        values: [
          {
            id: "0",
            label: "Homme",
            value: "male",
          },
          {
            id: "1",
            label: "Femme",
            value: "female",
          },
        ],
      },
      children: [],
      uuid: "gender",
    },
  ],
  fieldValues: {
    first_name: "John",
    gender: "",
    last_name: "Doe",
  },
  output: [
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
    { label: "Sexe", name: "gender", type: "select", value: { label: undefined, value: undefined } },
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
  ],
};

const formWithDateRangeFields: Mock = {
  fields: [
    {
      attributes: {
        depth: 0,
        isLeaf: true,
        isRoot: true,
        label: "Name",
        name: "a",
        type: "dateRange",
      },
      children: [],
      uuid: "a",
    },
  ],
  fieldValues: {
    a: ["2024-01-10", "2024-01-15"],
  },
  output: [
    {
      label: "Name",
      name: "a",
      type: "dateRange",
      value: ["2024-01-10", "2024-01-15"],
    },
  ],
};

const formWithDecision: Mock = {
  fields: [
    {
      attributes: {
        depth: 0,
        isDecision: true,
        isLeaf: false,
        isRoot: true,
        label: "decision",
        name: "decision",
        type: "select",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "1",
            name: "1",
            value: "1",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: false,
                label: "text1",
                name: "text1",
                type: "text",
              },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: true,
                    label: "f",
                    name: "f",
                    type: "text",
                  },
                  children: [],
                  uuid: "f",
                },
              ],
              uuid: "text1",
            },
          ],
          uuid: "decision:1",
        },
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "2",
            name: "2",
            value: "2",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: false,
                label: "text2",
                name: "text2",
                type: "text",
              },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: true,
                    label: "f",
                    name: "f",
                    type: "text",
                  },
                  children: [],
                  uuid: "ff",
                },
              ],
              uuid: "text2",
            },
          ],
          uuid: "decision:2",
        },
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "3",
            name: "3",
            value: "3",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: false,
                label: "text3",
                name: "text3",
                type: "text",
              },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: true,
                    label: "f",
                    name: "f",
                    type: "text",
                  },
                  children: [],
                  uuid: "fff",
                },
              ],
              uuid: "text3",
            },
          ],
          uuid: "decision:3",
        },
      ],
      uuid: "decision",
    },
    {
      attributes: {
        depth: 2,
        isLeaf: false,
        label: "text1",
        name: "text1",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 3,
            isLeaf: true,
            label: "f",
            name: "f",
            type: "text",
          },
          children: [],
          uuid: "f",
        },
      ],
      uuid: "text1",
    },
    {
      attributes: {
        depth: 3,
        isLeaf: true,
        label: "f",
        name: "f",
        type: "text",
      },
      children: [],
      uuid: "f",
    },
  ],
  fieldValues: {
    decision: "1",
    f: "1",
    text1: "1",
  },
  output: [
    {
      label: "decision",
      name: "decision",
      type: "select",
      value: {
        label: "1",
        value: "1",
      },
    },
    {
      label: "f",
      name: "f",
      type: "text",
      value: "1",
    },
    {
      label: "text1",
      name: "text1",
      type: "text",
      value: "1",
    },
  ],
};

export {
  formWithDecision,
  formWithTextFields,
  formWithSelectFields,
  formWithRadioFields,
  formWithSwitchFields,
  formWithCheckboxFields,
  formWithDecisionFields,
  formWithTagFields,
  formWithTextFieldsUndefined,
  formWithSelectFieldsUndefined,
  formWithDateRangeFields,
};
