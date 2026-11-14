/**
 * @generated SignedSource<<0ac56601f5ec7af54f0d309e8c3fc8a0>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MainAuthGateQuery$variables = Record<PropertyKey, never>;
export type MainAuthGateQuery$data = {
  readonly authState: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"authDestination_authState">;
  };
};
export type MainAuthGateQuery = {
  response: MainAuthGateQuery$data;
  variables: MainAuthGateQuery$variables;
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
  "name": "status",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "signupStep",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainAuthGateQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AuthState",
        "kind": "LinkedField",
        "name": "authState",
        "plural": false,
        "selections": [
          (v0/*:: as any*/),
          {
            "kind": "InlineDataFragmentSpread",
            "name": "authDestination_authState",
            "selections": [
              (v1/*:: as any*/),
              (v2/*:: as any*/)
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MainAuthGateQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AuthState",
        "kind": "LinkedField",
        "name": "authState",
        "plural": false,
        "selections": [
          (v0/*:: as any*/),
          (v1/*:: as any*/),
          (v2/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "67885ce7be845bd4877c9fc9fcbe2678",
    "id": null,
    "metadata": {},
    "name": "MainAuthGateQuery",
    "operationKind": "query",
    "text": "query MainAuthGateQuery {\n  authState {\n    id\n    ...authDestination_authState\n  }\n}\n\nfragment authDestination_authState on AuthState {\n  status\n  signupStep\n}\n"
  }
};
})();

(node as any).hash = "a0e1a5a021954e6c16bd347053129c32";

export default node;
