/**
 * @generated SignedSource<<3bdc8a78f67901efbcee7789f990c878>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GenderRestriction = "ANY" | "FEMALE_ONLY" | "MALE_ONLY" | "%future added value";
export type GroupCategory = "CAREER" | "CLASS_FRIEND" | "ETC" | "FOOD" | "FREE_PERIOD" | "HABIT" | "HOBBY_CULTURE" | "JOB_HUNTING" | "%future added value";
export type ParticipationMethod = "AUTO_APPROVAL" | "MANUAL_APPROVAL" | "%future added value";
export type GroupEditScreenQuery$variables = {
  groupId: string;
};
export type GroupEditScreenQuery$data = {
  readonly group: {
    readonly capacity: number;
    readonly category: GroupCategory;
    readonly content: string;
    readonly genderRestriction: GenderRestriction;
    readonly id: string;
    readonly images: ReadonlyArray<{
      readonly id: string;
      readonly url: string;
    }>;
    readonly location: string;
    readonly meetingAt: string;
    readonly participantCount: number;
    readonly participationMethod: ParticipationMethod;
    readonly title: string;
    readonly " $fragmentSpreads": FragmentRefs<"groupHostAction_group">;
  } | null | undefined;
};
export type GroupEditScreenQuery = {
  response: GroupEditScreenQuery$data;
  variables: GroupEditScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "groupId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "groupId",
    "variableName": "groupId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "meetingAt",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "location",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "capacity",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "participantCount",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "participationMethod",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "genderRestriction",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "images",
  "plural": true,
  "selections": [
    (v2/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerRole",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GroupEditScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Group",
        "kind": "LinkedField",
        "name": "group",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          (v4/*:: as any*/),
          (v5/*:: as any*/),
          (v6/*:: as any*/),
          (v7/*:: as any*/),
          (v8/*:: as any*/),
          (v9/*:: as any*/),
          (v10/*:: as any*/),
          (v11/*:: as any*/),
          (v12/*:: as any*/),
          {
            "kind": "InlineDataFragmentSpread",
            "name": "groupHostAction_group",
            "selections": [
              (v13/*:: as any*/),
              (v14/*:: as any*/)
            ],
            "args": null,
            "argumentDefinitions": []
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "GroupEditScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Group",
        "kind": "LinkedField",
        "name": "group",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          (v4/*:: as any*/),
          (v5/*:: as any*/),
          (v6/*:: as any*/),
          (v7/*:: as any*/),
          (v8/*:: as any*/),
          (v9/*:: as any*/),
          (v10/*:: as any*/),
          (v11/*:: as any*/),
          (v12/*:: as any*/),
          (v13/*:: as any*/),
          (v14/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6238daca04b5e21c47950a26d4992c13",
    "id": null,
    "metadata": {},
    "name": "GroupEditScreenQuery",
    "operationKind": "query",
    "text": "query GroupEditScreenQuery(\n  $groupId: ID!\n) {\n  group(groupId: $groupId) {\n    id\n    title\n    content\n    category\n    meetingAt\n    location\n    capacity\n    participantCount\n    participationMethod\n    genderRestriction\n    images {\n      id\n      url\n    }\n    ...groupHostAction_group\n  }\n}\n\nfragment groupHostAction_group on Group {\n  status\n  viewerRole\n}\n"
  }
};
})();

(node as any).hash = "e5a40acfbf556f4ed74b7bdd5b316a0c";

export default node;
