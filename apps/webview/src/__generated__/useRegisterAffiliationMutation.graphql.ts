/**
 * @generated SignedSource<<a13959382f1938233ea3dbdbfc09e2d6>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type College = "ARTS_AND_PHYSICAL_EDUCATION" | "CONVERGENCE_SCIENCE" | "CREATIVE_ENGINEERING" | "HUMANITIES" | "SOCIAL_SCIENCES" | "SOFTWARE_AND_BUSINESS" | "TOURISM_AND_CULTURE" | "%future added value";
export type RegisterAffiliationInput = {
  college: College;
  studentId: string;
};
export type useRegisterAffiliationMutation$variables = {
  input: RegisterAffiliationInput;
};
export type useRegisterAffiliationMutation$data = {
  readonly registerAffiliation: {
    readonly authState: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"authDestination_authState">;
    } | null | undefined;
    readonly error: {
      readonly __typename: "InvalidStudentIdError";
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
export type useRegisterAffiliationMutation = {
  response: useRegisterAffiliationMutation$data;
  variables: useRegisterAffiliationMutation$variables;
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
      "type": "InvalidStudentIdError",
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
    "name": "useRegisterAffiliationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "RegisterAffiliationResult",
        "kind": "LinkedField",
        "name": "registerAffiliation",
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
    "name": "useRegisterAffiliationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "RegisterAffiliationResult",
        "kind": "LinkedField",
        "name": "registerAffiliation",
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
    "cacheID": "0818dd05549f5c6b7bb08f620e1d121e",
    "id": null,
    "metadata": {},
    "name": "useRegisterAffiliationMutation",
    "operationKind": "mutation",
    "text": "mutation useRegisterAffiliationMutation(\n  $input: RegisterAffiliationInput!\n) {\n  registerAffiliation(input: $input) {\n    authState {\n      id\n      ...authDestination_authState\n    }\n    error {\n      __typename\n      ... on InvalidStudentIdError {\n        message\n      }\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n\nfragment authDestination_authState on AuthState {\n  status\n  signupStep\n}\n"
  }
};
})();

(node as any).hash = "48ec3e518f362c312741643c17d2ca09";

export default node;
