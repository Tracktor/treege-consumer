const basicJsonValues = [
  {
    label: "address",
    name: "address",
    type: "address",
    value: {
      description: "Paris, France",
      matched_substrings: [
        {
          length: 5,
          offset: 0,
        },
        {
          length: 6,
          offset: 7,
        },
      ],
      place_id: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
      reference: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
      structured_formatting: {
        main_text: "Paris",
        main_text_matched_substrings: [
          {
            length: 5,
            offset: 0,
          },
        ],
        secondary_text: "France",
        secondary_text_matched_substrings: [
          {
            length: 6,
            offset: 0,
          },
        ],
      },
      terms: [
        {
          offset: 0,
          value: "Paris",
        },
        {
          offset: 7,
          value: "France",
        },
      ],
      types: ["locality", "political", "geocode"],
    },
  },
];
export default basicJsonValues;
