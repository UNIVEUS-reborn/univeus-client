/**
 * @generated SignedSource<<6ad29a9ea9f9d3c1133c16a6e05e07ab>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SignInWithGoogleInput = {
  googleIdToken: string;
};
export type useSignInWithGoogleMutation$variables = {
  input: SignInWithGoogleInput;
};
export type useSignInWithGoogleMutation$data = {
  readonly signInWithGoogle: {
    readonly authState: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"authDestination_authState">;
    } | null | undefined;
    readonly error: {
      readonly __typename: "InvalidGoogleTokenError";
      readonly message: string;
    } | {
      readonly __typename: "NotUniversityEmailError";
      readonly message: string;
    } | {
      readonly __typename: "UnexpectedError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  };
};
export type useSignInWithGoogleMutation = {
  response: useSignInWithGoogleMutation$data;
  variables: useSignInWithGoogleMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
  "name": "status",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "signupStep",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "message",
    "storageKey": null
  }
],
v6 = {
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
      "selections": (v5/*:: as any*/),
      "type": "NotUniversityEmailError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v5/*:: as any*/),
      "type": "InvalidGoogleTokenError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v5/*:: as any*/),
      "type": "UnexpectedError",
      "abstractKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useSignInWithGoogleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "SignInWithGoogleResult",
        "kind": "LinkedField",
        "name": "signInWithGoogle",
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
              (v2/*:: as any*/),
              {
                "kind": "InlineDataFragmentSpread",
                "name": "authDestination_authState",
                "selections": [
                  (v3/*:: as any*/),
                  (v4/*:: as any*/)
                ],
                "args": null,
                "argumentDefinitions": []
              }
            ],
            "storageKey": null
          },
          (v6/*:: as any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "useSignInWithGoogleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "SignInWithGoogleResult",
        "kind": "LinkedField",
        "name": "signInWithGoogle",
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
              (v2/*:: as any*/),
              (v3/*:: as any*/),
              (v4/*:: as any*/)
            ],
            "storageKey": null
          },
          (v6/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9d738f904b0e69b8e55e253d2bf96ab6",
    "id": null,
    "metadata": {},
    "name": "useSignInWithGoogleMutation",
    "operationKind": "mutation",
    "text": "mutation useSignInWithGoogleMutation(\n  $input: SignInWithGoogleInput!\n) {\n  signInWithGoogle(input: $input) {\n    authState {\n      id\n      ...authDestination_authState\n    }\n    error {\n      __typename\n      ... on NotUniversityEmailError {\n        message\n      }\n      ... on InvalidGoogleTokenError {\n        message\n      }\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n\nfragment authDestination_authState on AuthState {\n  status\n  signupStep\n}\n"
  }
};
})();

(node as any).hash = "decb44beed47a66182a85e37c1ac4624";

export default node;
