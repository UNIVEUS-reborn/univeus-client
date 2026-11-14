/**
 * @generated SignedSource<<43b3e39485b39f29f9243c89909f5642>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsScreenQuery$variables = Record<PropertyKey, never>;
export type SettingsScreenQuery$data = {
  readonly viewer: {
    readonly id: string;
    readonly marketingAgreed: boolean;
    readonly user: {
      readonly " $fragmentSpreads": FragmentRefs<"UserProfileCard_user">;
    };
  };
};
export type SettingsScreenQuery = {
  response: SettingsScreenQuery$data;
  variables: SettingsScreenQuery$variables;
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
  "kind": "ScalarField",
  "name": "marketingAgreed",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*:: as any*/),
          (v1/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "UserProfileCard_user"
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SettingsScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*:: as any*/),
          (v1/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
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
                "kind": "ScalarField",
                "name": "admissionYear",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "college",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "gender",
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": null
                  },
                  (v0/*:: as any*/)
                ],
                "storageKey": null
              },
              (v0/*:: as any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d190f50b1a23f20dfd44c377faab91bd",
    "id": null,
    "metadata": {},
    "name": "SettingsScreenQuery",
    "operationKind": "query",
    "text": "query SettingsScreenQuery {\n  viewer {\n    id\n    marketingAgreed\n    user {\n      ...UserProfileCard_user\n      id\n    }\n  }\n}\n\nfragment UserAvatar_user on User {\n  gender\n  profileImage {\n    url\n    id\n  }\n}\n\nfragment UserProfileCard_user on User {\n  nickname\n  admissionYear\n  college\n  ...UserAvatar_user\n}\n"
  }
};
})();

(node as any).hash = "2717dd5e8e52c7303b063ef2415722d9";

export default node;
