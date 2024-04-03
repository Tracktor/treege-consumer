const basicExample = {
  attributes: {
    depth: 0,
    isLeaf: true,
    isRoot: true,
    label: "address",
    name: "address",
    type: "address",
  },
  children: [],
  uuid: ":r20:",
};

//     {
//   attributes: {
//     depth: 0,
//     initialQuery: true,
//     isLeaf: false,
//     isRoot: true,
//     label: "Recherchez un équipement",
//     name: "article",
//     required: false,
//     route: {
//       params: [
//         {
//           id: "1",
//           key: "lang",
//           value: "fra",
//         },
//         {
//           id: "2",
//           key: "limit",
//           value: "10",
//         },
//       ],
//       pathKey: {
//         image: "image",
//         label: "name",
//       },
//       searchKey: "text",
//       url: "https://client.api.dev.tracktor.fr/v2/search/articles",
//     },
//     type: "autocomplete",
//   },
//   children: [
//     {
//       attributes: {
//         depth: 1,
//         isLeaf: false,
//         isMultiple: true,
//         label: "Ajoutez des options",
//         name: "options",
//         parentRef: "article",
//         route: {
//           pathKey: {
//             image: "image",
//             label: "articleName",
//             object: "options",
//             value: "id",
//           },
//           url: "",
//         },
//         type: "dynamicSelect",
//       },
//       children: [],
//       uuid: ":ren:",
//     },
//   ],
//   uuid: ":rp:",
// };

export default basicExample;

// {
//   "attributes": {
//   "depth": 0,
//       "name": "article",
//       "type": "autocomplete",
//       "label": "Recherchez un équipement",
//       "route": {
//     "url": "https://client.api.dev.tracktor.fr/v2/search/articles",
//         "params": [
//       {
//         "id": "1",
//         "key": "lang",
//         "value": "fra"
//       },
//       {
//         "id": "2",
//         "key": "limit",
//         "value": "10"
//       }
//     ],
//         "pathKey": {
//       "image": "image",
//           "label": "name"
//     },
//     "searchKey": "text"
//   },
//   "required": true,
//       "initialQuery": true,
//       "isRoot": true,
//       "isLeaf": false
// },
//   "children": [
//   {
//     "attributes": {
//       "depth": 1,
//       "name": "options",
//       "type": "dynamicSelect",
//       "label": "Ajoutez des options",
//       "route": {
//         "pathKey": {
//           "image": "image",
//           "label": "articleName",
//           "object": "options",
//           "value": "id"
//         },
//         "url": ""
//       },
//       "parentRef": "article",
//       "isMultiple": true,
//       "isLeaf": false
//     },
//     "children": [
//       {
//         "attributes": {
//           "depth": 2,
//           "name": "dateLocation",
//           "type": "dateRange",
//           "required": true,
//           "isLeaf": false
//         },
//         "children": [
//           {
//             "attributes": {
//               "depth": 3,
//               "name": "useOnSaturday",
//               "type": "checkbox",
//               "label": "Utiliser le samedi",
//               "isLeaf": false
//             },
//             "children": [
//               {
//                 "attributes": {
//                   "depth": 4,
//                   "name": "useOnSunday",
//                   "type": "checkbox",
//                   "label": "Utiliser le dimanche",
//                   "isLeaf": false
//                 },
//                 "children": [
//                   {
//                     "attributes": {
//                       "depth": 5,
//                       "name": "worksite",
//                       "type": "autocomplete",
//                       "label": "Sélectionnez votre chantier",
//                       "route": {
//                         "url": "https://client.api.dev.tracktor.fr/v2/search/worksites",
//                         "searchKey": "text",
//                         "pathKey": {
//                           "value": "id",
//                           "label": "name"
//                         }
//                       },
//                       "required": true,
//                       "initialQuery": true,
//                       "isLeaf": false
//                     },
//                     "children": [
//                       {
//                         "attributes": {
//                           "depth": 6,
//                           "name": "hoursConstraints",
//                           "type": "timeRange",
//                           "label": "Heures de livraison",
//                           "helperText": "09:00-20:00",
//                           "isLeaf": false
//                         },
//                         "children": [
//                           {
//                             "attributes": {
//                               "depth": 7,
//                               "name": "siteConstraints",
//                               "type": "text",
//                               "label": "Contraintes d'accès",
//                               "required": true,
//                               "isLeaf": false
//                             },
//                             "children": [
//                               {
//                                 "attributes": {
//                                   "depth": 8,
//                                   "name": "dropOffDescription",
//                                   "type": "text",
//                                   "label": "Point de dépôt",
//                                   "required": true,
//                                   "isLeaf": false
//                                 },
//                                 "children": [
//                                   {
//                                     "attributes": {
//                                       "depth": 9,
//                                       "name": "addPicture",
//                                       "type": "file",
//                                       "label": "Ajouter une photo",
//                                       "isMultiple": true,
//                                       "isLeaf": false
//                                     },
//                                     "children": [
//                                       {
//                                         "attributes": {
//                                           "depth": 10,
//                                           "name": "worksiteContacts",
//                                           "type": "dynamicSelect",
//                                           "label": "Ajoutez des contacts sur site",
//                                           "route": {
//                                             "url": "https://client.api.dev.tracktor.fr/v2/worksites/{{worksite}}/contacts",
//                                             "pathKey": {
//                                               "value": "id",
//                                               "label": "email"
//                                             }
//                                           },
//                                           "required": true,
//                                           "parentRef": "worksite",
//                                           "isLeaf": true
//                                         },
//                                         "children": [],
//                                         "uuid": ":rs3:"
//                                       }
//                                     ],
//                                     "uuid": ":rqh:"
//                                   }
//                                 ],
//                                 "uuid": ":rpp:"
//                               }
//                             ],
//                             "uuid": ":rp1:"
//                           }
//                         ],
//                         "uuid": ":ro9:"
//                       }
//                     ],
//                     "uuid": ":rn5:"
//                   }
//                 ],
//                 "uuid": ":rm9:"
//               }
//             ],
//             "uuid": ":rld:"
//           }
//         ],
//         "uuid": ":rjv:"
//       }
//     ],
//     "uuid": ":ren:"
//   }
// ],
//     "uuid": ":rp:"
// }
