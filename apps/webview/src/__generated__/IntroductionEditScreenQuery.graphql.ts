/**
 * @generated SignedSource<<13cd73bec0e80ef9b7cfe26195c2e2b4>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IntroductionEditScreenQuery$variables = Record<PropertyKey, never>;
export type IntroductionEditScreenQuery$data = {
  readonly viewer: {
    readonly user: {
      readonly id: string;
      readonly introduction: {
        readonly collegeGoal: string | null | undefined;
        readonly favoriteFood: string | null | undefined;
        readonly interest: string | null | undefined;
        readonly matchingPerson: string | null | undefined;
        readonly mbti: string | null | undefined;
        readonly recentSong: string | null | undefined;
      } | null | undefined;
    };
  };
};
export type IntroductionEditScreenQuery = {
  response: IntroductionEditScreenQuery$data;
  variables: IntroductionEditScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": [
    (v0/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "UserIntroduction",
      "kind": "LinkedField",
      "name": "introduction",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "mbti",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "favoriteFood",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "recentSong",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "interest",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "matchingPerson",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "collegeGoal",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "IntroductionEditScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*:: as any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IntroductionEditScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*:: as any*/),
          (v0/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ef2f61eb054179038f735f6181e91981",
    "id": null,
    "metadata": {},
    "name": "IntroductionEditScreenQuery",
    "operationKind": "query",
    "text": "query IntroductionEditScreenQuery {\n  viewer {\n    user {\n      id\n      introduction {\n        mbti\n        favoriteFood\n        recentSong\n        interest\n        matchingPerson\n        collegeGoal\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "0322e056695bc0dad404cb0aebdb517d";

export default node;
