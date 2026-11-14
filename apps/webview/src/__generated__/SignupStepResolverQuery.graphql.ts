/**
 * @generated SignedSource<<5af2300c7028df49bf6bb4b5de280b51>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SignupStepResolverQuery$variables = Record<PropertyKey, never>;
export type SignupStepResolverQuery$data = {
  readonly authState: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"authDestination_authState">;
  };
};
export type SignupStepResolverQuery = {
  response: SignupStepResolverQuery$data;
  variables: SignupStepResolverQuery$variables;
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
    "name": "SignupStepResolverQuery",
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
    "name": "SignupStepResolverQuery",
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
    "cacheID": "d26e53c7bdd6310fa52edee9661f65b1",
    "id": null,
    "metadata": {},
    "name": "SignupStepResolverQuery",
    "operationKind": "query",
    "text": "query SignupStepResolverQuery {\n  authState {\n    id\n    ...authDestination_authState\n  }\n}\n\nfragment authDestination_authState on AuthState {\n  status\n  signupStep\n}\n"
  }
};
})();

(node as any).hash = "c68c084164f7188263386b97b0e666b8";

export default node;
