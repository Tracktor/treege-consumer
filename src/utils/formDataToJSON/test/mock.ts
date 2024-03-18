import TreeNode from "@/types/TreeNode";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

interface Mock {
  fields: TreeNode[];
  formValue: [string, FormDataEntryValue][];
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
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: true,
            label: "Prénom",
            type: "text",
          },
          children: [],
          name: "first_name",
        },
      ],
      name: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: true,
        label: "Prénom",
        type: "text",
      },
      children: [],
      name: "first_name",
    },
  ],
  formValue: [
    ["last_name", "Doe"],
    ["first_name", "John"],
  ],
  output: [
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
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
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "Prénom",
            type: "text",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: true,
                label: "Sexe",
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
              name: "gender",
            },
          ],
          name: "first_name",
        },
      ],
      name: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "Prénom",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            label: "Sexe",
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
          name: "gender",
        },
      ],
      name: "first_name",
    },
    {
      attributes: {
        depth: 2,
        isLeaf: true,
        label: "Sexe",
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
      name: "gender",
    },
  ],
  formValue: [
    ["last_name", "Doe"],
    ["first_name", "John"],
    ["gender", "male"],
  ],
  output: [
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
    { label: "Sexe", name: "gender", type: "select", value: { label: "Homme", value: "male" } },
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
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "Prénom",
            type: "text",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: true,
                label: "Sexe",
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
              name: "gender",
            },
          ],
          name: "first_name",
        },
      ],
      name: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "Prénom",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            label: "Sexe",
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
          name: "gender",
        },
      ],
      name: "first_name",
    },
    {
      attributes: {
        depth: 2,
        isLeaf: true,
        label: "Sexe",
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
      name: "gender",
    },
  ],
  formValue: [
    ["last_name", "Doe"],
    ["first_name", "John"],
    ["gender", "male"],
  ],
  output: [
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
    { label: "Sexe", name: "gender", type: "radio", value: { label: "Homme", value: "male" } },
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
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "Prénom",
            type: "text",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: true,
                isRoot: false,
                label: "Administrateur",
                type: "switch",
              },
              children: [],
              name: "admin",
            },
          ],
          name: "first_name",
        },
      ],
      name: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "Prénom",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            isRoot: false,
            label: "Administrateur",
            type: "switch",
          },
          children: [],
          name: "admin",
        },
      ],
      name: "first_name",
    },
    {
      attributes: {
        depth: 2,
        isLeaf: true,
        isRoot: false,
        label: "Administrateur",
        type: "switch",
      },
      children: [],
      name: "admin",
    },
  ],
  formValue: [
    ["last_name", "Doe"],
    ["first_name", "John"],
    ["admin", "on"],
  ],
  output: [
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
    { label: "Administrateur", name: "admin", type: "switch", value: true },
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
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "Prénom",
            type: "text",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: true,
                isRoot: false,
                label: "Administrateur",
                type: "switch",
              },
              children: [],
              name: "admin",
            },
          ],
          name: "first_name",
        },
      ],
      name: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "Prénom",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            isRoot: false,
            label: "Administrateur",
            type: "switch",
          },
          children: [],
          name: "admin",
        },
      ],
      name: "first_name",
    },
    {
      attributes: {
        depth: 2,
        isLeaf: true,
        isRoot: false,
        label: "Administrateur",
        type: "checkbox",
      },
      children: [],
      name: "admin",
    },
  ],
  formValue: [
    ["last_name", "Doe"],
    ["first_name", "John"],
    ["admin", "on"],
  ],
  output: [
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
    { label: "Administrateur", name: "admin", type: "checkbox", value: true },
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
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "Prénom",
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
                type: "select",
              },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: false,
                    label: "Incident",
                    value: "incident",
                  },
                  children: [
                    {
                      attributes: {
                        depth: 4,
                        isLeaf: true,
                        label: "Type d'incident",
                        type: "text",
                      },
                      children: [],
                      name: "incident_type",
                    },
                  ],
                  name: "event_type:incident",
                },
                {
                  attributes: {
                    depth: 3,
                    isLeaf: false,
                    label: "other",
                    value: "other",
                  },
                  children: [
                    {
                      attributes: {
                        depth: 4,
                        isLeaf: true,
                        label: "Autre événement",
                        type: "text",
                      },
                      children: [],
                      name: "other_event",
                    },
                  ],
                  name: "event_type:other",
                },
              ],
              name: "event_type",
            },
          ],
          name: "first_name",
        },
      ],
      name: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "Prénom",
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
            type: "select",
          },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: false,
                label: "Incident",
                value: "incident",
              },
              children: [
                {
                  attributes: {
                    depth: 4,
                    isLeaf: true,
                    label: "Type d'incident",
                    type: "text",
                  },
                  children: [],
                  name: "incident_type",
                },
              ],
              name: "event_type:incident",
            },
            {
              attributes: {
                depth: 3,
                isLeaf: false,
                label: "other",
                value: "other",
              },
              children: [
                {
                  attributes: {
                    depth: 4,
                    isLeaf: true,
                    label: "Autre événement",
                    type: "text",
                  },
                  children: [],
                  name: "other_event",
                },
              ],
              name: "event_type:other",
            },
          ],
          name: "event_type",
        },
      ],
      name: "first_name",
    },
    {
      attributes: {
        depth: 2,
        isDecision: true,
        isLeaf: false,
        isRoot: false,
        label: "Type d'evenement",
        type: "select",
      },
      children: [
        {
          attributes: {
            depth: 3,
            isLeaf: false,
            label: "Incident",
            value: "incident",
          },
          children: [
            {
              attributes: {
                depth: 4,
                isLeaf: true,
                label: "Type d'incident",
                type: "text",
              },
              children: [],
              name: "incident_type",
            },
          ],
          name: "event_type:incident",
        },
        {
          attributes: {
            depth: 3,
            isLeaf: false,
            label: "other",
            value: "other",
          },
          children: [
            {
              attributes: {
                depth: 4,
                isLeaf: true,
                label: "Autre événement",
                type: "text",
              },
              children: [],
              name: "other_event",
            },
          ],
          name: "event_type:other",
        },
      ],
      name: "event_type",
    },
    {
      attributes: {
        depth: 4,
        isLeaf: true,
        label: "Type d'incident",
        type: "text",
      },
      children: [],
      name: "incident_type",
    },
  ],
  formValue: [
    ["last_name", "Doe"],
    ["first_name", "John"],
    ["event_type", "event_type:incident"],
    ["incident_type", "Incendie "],
  ],
  output: [
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
    {
      label: "Type d'evenement",
      name: "event_type",
      type: "select",
      value: { label: "Incident", value: "incident" },
    },
    {
      label: "Type d'incident",
      name: "incident_type",
      type: "text",
      value: "Incendie ",
    },
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
        tag: "last_name",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: true,
            label: "Prénom",
            type: "text",
          },
          children: [],
          name: "first_name",
        },
      ],
      name: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: true,
        label: "Prénom",
        type: "text",
      },
      children: [],
      name: "first_name",
    },
  ],
  formValue: [
    ["last_name", "Doe"],
    ["first_name", "John"],
  ],
  output: [
    { label: "Nom", name: "last_name", tag: "last_name", type: "text", value: "Doe" },
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
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
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: true,
            label: "Prénom",
            type: "text",
          },
          children: [],
          name: "first_name",
        },
      ],
      name: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: true,
        label: "Prénom",
        type: "text",
      },
      children: [],
      name: "first_name",
    },
  ],
  formValue: [
    ["last_name", "Doe"],
    ["first_name", ""],
  ],
  output: [
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
    { label: "Prénom", name: "first_name", type: "text", value: "" },
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
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            label: "Prénom",
            type: "text",
          },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: true,
                label: "Sexe",
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
              name: "gender",
            },
          ],
          name: "first_name",
        },
      ],
      name: "last_name",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "Prénom",
        type: "text",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            label: "Sexe",
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
          name: "gender",
        },
      ],
      name: "first_name",
    },
    {
      attributes: {
        depth: 2,
        isLeaf: true,
        label: "Sexe",
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
      name: "gender",
    },
  ],
  formValue: [
    ["last_name", "Doe"],
    ["first_name", "John"],
    ["gender", ""],
  ],
  output: [
    { label: "Nom", name: "last_name", type: "text", value: "Doe" },
    { label: "Prénom", name: "first_name", type: "text", value: "John" },
    { label: "Sexe", name: "gender", type: "select", value: { label: "", value: "" } },
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
        type: "dateRange",
      },
      children: [],
      name: "a",
    },
  ],
  formValue: [
    ["a", "2024-01-10"],
    ["a", "2024-01-15"],
  ],
  output: [
    {
      label: "Name",
      name: "a",
      type: "dateRange",
      value: ["2024-01-10", "2024-01-15"],
    },
  ],
};

export {
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
