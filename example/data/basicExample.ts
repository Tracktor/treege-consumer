const basicExample = {
  attributes: {
    depth: 0,
    initialQuery: true,
    isLeaf: false,
    isRoot: true,
    label: "Recherchez un équipement",
    name: "article",
    required: false,
    route: {
      params: [
        {
          id: "1",
          key: "lang",
          value: "fra",
        },
        {
          id: "2",
          key: "limit",
          value: "10",
        },
      ],
      pathKey: {
        image: "image",
        label: "name",
      },
      searchKey: "text",
      url: "https://client.api.dev.tracktor.fr/v2/search/articles",
    },
    type: "autocomplete",
  },
  children: [
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        isMultiple: true,
        label: "Ajoutez des options",
        name: "options",
        parentRef: "article",
        route: {
          pathKey: {
            image: "image",
            label: "articleName",
            object: "options",
            value: "id",
          },
          url: "",
        },
        type: "dynamicSelect",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: false,
            name: "dateLocation",
            required: false,
            type: "dateRange",
          },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: false,
                label: "Utiliser le samedi",
                name: "useOnSaturday",
                type: "checkbox",
              },
              children: [
                {
                  attributes: {
                    depth: 4,
                    isLeaf: false,
                    label: "Utiliser le dimanche",
                    name: "useOnSunday",
                    type: "checkbox",
                  },
                  children: [
                    {
                      attributes: {
                        depth: 5,
                        initialQuery: true,
                        isLeaf: false,
                        label: "Sélectionnez votre chantier",
                        name: "worksite",
                        required: false,
                        route: {
                          pathKey: {
                            label: "name",
                            value: "id",
                          },
                          searchKey: "text",
                          url: "https://client.api.dev.tracktor.fr/v2/search/worksites",
                        },
                        type: "autocomplete",
                      },
                      children: [
                        {
                          attributes: {
                            depth: 6,
                            helperText: "09:00-20:00",
                            isLeaf: false,
                            label: "Heures de livraison",
                            name: "hoursConstraints",
                            type: "timeRange",
                          },
                          children: [
                            {
                              attributes: {
                                depth: 7,
                                isLeaf: false,
                                label: "Contraintes d'accès",
                                name: "siteConstraints",
                                required: false,
                                type: "text",
                              },
                              children: [
                                {
                                  attributes: {
                                    depth: 8,
                                    isLeaf: false,
                                    label: "Point de dépôt",
                                    name: "dropOffDescription",
                                    required: false,
                                    type: "text",
                                  },
                                  children: [
                                    {
                                      attributes: {
                                        depth: 9,
                                        isLeaf: false,
                                        isMultiple: true,
                                        label: "Ajouter une photo",
                                        name: "addPicture",
                                        type: "file",
                                      },
                                      children: [
                                        {
                                          attributes: {
                                            depth: 10,
                                            isLeaf: true,
                                            label: "Ajoutez des contacts sur site",
                                            name: "worksiteContacts",
                                            parentRef: "worksite",
                                            required: false,
                                            route: {
                                              pathKey: {
                                                label: "email",
                                                value: "id",
                                              },
                                              url: "https://client.api.dev.tracktor.fr/v2/worksites/{{worksite}}/contacts",
                                            },
                                            type: "dynamicSelect",
                                          },
                                          children: [],
                                          uuid: ":rs3:",
                                        },
                                      ],
                                      uuid: ":rqh:",
                                    },
                                  ],
                                  uuid: ":rpp:",
                                },
                              ],
                              uuid: ":rp1:",
                            },
                          ],
                          uuid: ":ro9:",
                        },
                      ],
                      uuid: ":rn5:",
                    },
                  ],
                  uuid: ":rm9:",
                },
              ],
              uuid: ":rld:",
            },
          ],
          uuid: ":rjv:",
        },
      ],
      uuid: ":ren:",
    },
  ],
  uuid: ":rp:",
};

export default basicExample;
