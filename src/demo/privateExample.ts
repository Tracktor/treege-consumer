const privateExample = {
    attributes: {
        depth: 0,
        initialQuery: true,
        isLeaf: false,
        isRoot: true,
        label: "Recherchez un \u00e9quipement",
        required: true,
        route: {
            params: [
                { id: "1", key: "lang", value: "fra" },
                { id: "2", key: "limit", value: "10" },
            ],
            pathKey: { image: "image", label: "name" },
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
                isRoot: false,
                label: "Ajoutez des options",
                parentRef: "article",
                route: { pathKey: { image: "image", label: "articleName", object: "options", value: "id" }, url: "" },
                type: "dynamicSelect",
            },
            children: [
                {
                    attributes: { depth: 2, isLeaf: false, isRoot: false, label: " ", required: true, type: "dateRange" },
                    children: [
                        {
                            attributes: { depth: 3, isLeaf: false, label: "Utiliser le samedi", type: "checkbox" },
                            children: [
                                {
                                    attributes: { depth: 4, isLeaf: false, label: "Utiliser le dimanche", type: "checkbox" },
                                    children: [
                                        {
                                            attributes: {
                                                depth: 5,
                                                initialQuery: true,
                                                isLeaf: false,
                                                isRoot: false,
                                                label: "S\u00e9lectionnez votre chantier",
                                                required: true,
                                                route: {
                                                    params: [
                                                        { id: "1", key: "lang", value: "fra" },
                                                        { id: "2", key: "limit", value: "10" },
                                                    ],
                                                    pathKey: { label: "name", value: "id" },
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
                                                        isRoot: false,
                                                        label: "Heures de livraison",
                                                        required: true,
                                                        type: "time",
                                                    },
                                                    children: [
                                                        {
                                                            attributes: {
                                                                depth: 7,
                                                                isLeaf: false,
                                                                isRoot: false,
                                                                label: "Contraintes d'acc\u00e8s",
                                                                required: true,
                                                                type: "text",
                                                            },
                                                            children: [
                                                                {
                                                                    attributes: {
                                                                        depth: 8,
                                                                        isLeaf: false,
                                                                        isRoot: false,
                                                                        label: "Point de d\u00e9p\u00f4t",
                                                                        required: true,
                                                                        type: "text",
                                                                    },
                                                                    children: [
                                                                        {
                                                                            attributes: { depth: 9, isLeaf: false, isMultiple: true, label: "Ajouter une photo", type: "file" },
                                                                            children: [
                                                                                {
                                                                                    attributes: {
                                                                                        depth: 10,
                                                                                        isLeaf: true,
                                                                                        isRoot: false,
                                                                                        label: "Ajoutez des contacts sur site",
                                                                                        parentRef: "worksite",
                                                                                        required: true,
                                                                                        route: {
                                                                                            pathKey: { label: "email", value: "id" },
                                                                                            url: "https://client.api.dev.tracktor.fr/v2/worksites/{{worksite}}/contacts",
                                                                                        },
                                                                                        type: "dynamicSelect",
                                                                                    },
                                                                                    children: [],
                                                                                    name: "worksiteContacts",
                                                                                },
                                                                            ],
                                                                            name: "addPicture",
                                                                        },
                                                                    ],
                                                                    name: "dropOffDescription",
                                                                },
                                                            ],
                                                            name: "siteConstraints",
                                                        },
                                                    ],
                                                    name: "hoursConstraints",
                                                },
                                            ],
                                            name: "worksite",
                                        },
                                    ],
                                    name: "useOnSunday",
                                },
                            ],
                            name: "useOnSaturday",
                        },
                    ],
                    name: "dateLocation",
                },
            ],
            name: "options",
        },
    ],
    name: "article",
};

export default privateExample
