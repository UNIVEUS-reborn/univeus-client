/**
 * @generated SignedSource<<d0f1c8608a676f0a76e15d517c2bc968>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AgreeToTermsInput = {
  marketing: boolean;
  privacyPolicy: boolean;
  serviceTerms: boolean;
};
export type useAgreeToTermsMutation$variables = {
  input: AgreeToTermsInput;
};
export type useAgreeToTermsMutation$data = {
  readonly agreeToTerms: {
    readonly authState: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"authDestination_authState">;
    } | null | undefined;
    readonly error: {
      readonly __typename: "RequiredTermsNotAgreedError";
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
export type useAgreeToTermsMutation = {
  response: useAgreeToTermsMutation$data;
  variables: useAgreeToTermsMutation$variables;
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
      "type": "RequiredTermsNotAgreedError",
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
    "name": "useAgreeToTermsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "AgreeToTermsResult",
        "kind": "LinkedField",
        "name": "agreeToTerms",
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
    "name": "useAgreeToTermsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "AgreeToTermsResult",
        "kind": "LinkedField",
        "name": "agreeToTerms",
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
    "cacheID": "7ca000d740a626b00655355cf8851757",
    "id": null,
    "metadata": {},
    "name": "useAgreeToTermsMutation",
    "operationKind": "mutation",
    "text": "mutation useAgreeToTermsMutation(\n  $input: AgreeToTermsInput!\n) {\n  agreeToTerms(input: $input) {\n    authState {\n      id\n      ...authDestination_authState\n    }\n    error {\n      __typename\n      ... on RequiredTermsNotAgreedError {\n        message\n      }\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n\nfragment authDestination_authState on AuthState {\n  status\n  signupStep\n}\n"
  }
};
})();

(node as any).hash = "17451b050e976fa7e18d72a58e62224f";

export default node;
