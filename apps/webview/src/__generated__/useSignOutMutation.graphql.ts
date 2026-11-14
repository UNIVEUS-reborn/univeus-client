/**
 * @generated SignedSource<<cce8c2827cc1ce652203b54a49e03f34>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AuthStatus = "SIGNED_IN" | "SIGNED_OUT" | "SIGNING_UP" | "%future added value";
export type useSignOutMutation$variables = Record<PropertyKey, never>;
export type useSignOutMutation$data = {
  readonly signOut: {
    readonly authState: {
      readonly id: string;
      readonly status: AuthStatus;
    } | null | undefined;
    readonly error: {
      readonly __typename: "UnexpectedError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  };
};
export type useSignOutMutation = {
  response: useSignOutMutation$data;
  variables: useSignOutMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "SignOutResult",
    "kind": "LinkedField",
    "name": "signOut",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AuthState",
        "kind": "LinkedField",
        "name": "authState",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "error",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "message",
                "storageKey": null
              }
            ],
            "type": "UnexpectedError",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useSignOutMutation",
    "selections": (v0/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useSignOutMutation",
    "selections": (v0/*:: as any*/)
  },
  "params": {
    "cacheID": "e34f48db408907e25e20d208681db271",
    "id": null,
    "metadata": {},
    "name": "useSignOutMutation",
    "operationKind": "mutation",
    "text": "mutation useSignOutMutation {\n  signOut {\n    authState {\n      id\n      status\n    }\n    error {\n      __typename\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "462a7ef1584c054d890a62f60e86502c";

export default node;
