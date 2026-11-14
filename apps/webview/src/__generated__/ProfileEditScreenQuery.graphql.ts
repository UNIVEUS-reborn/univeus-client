/**
 * @generated SignedSource<<676b95d1fed1edab4dc1441f6a45550f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ProfileEditScreenQuery$variables = Record<PropertyKey, never>;
export type ProfileEditScreenQuery$data = {
  readonly viewer: {
    readonly user: {
      readonly id: string;
      readonly nickname: string;
      readonly profileImage: {
        readonly id: string;
        readonly url: string;
      } | null | undefined;
    };
  };
};
export type ProfileEditScreenQuery = {
  response: ProfileEditScreenQuery$data;
  variables: ProfileEditScreenQuery$variables;
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
      "kind": "ScalarField",
      "name": "nickname",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "profileImage",
      "plural": false,
      "selections": [
        (v0/*:: as any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
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
    "name": "ProfileEditScreenQuery",
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
    "name": "ProfileEditScreenQuery",
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
    "cacheID": "f0d42ba2680552c30664b3aba3d586d0",
    "id": null,
    "metadata": {},
    "name": "ProfileEditScreenQuery",
    "operationKind": "query",
    "text": "query ProfileEditScreenQuery {\n  viewer {\n    user {\n      id\n      nickname\n      profileImage {\n        id\n        url\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3a60d68768f7c3f47e1e1f5066b13676";

export default node;
