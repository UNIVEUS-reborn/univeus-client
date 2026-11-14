/**
 * @generated SignedSource<<3b291b2c7c604027d25bb10641f0178d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UpdateMarketingAgreementInput = {
  agreed: boolean;
};
export type useUpdateMarketingAgreementMutation$variables = {
  input: UpdateMarketingAgreementInput;
};
export type useUpdateMarketingAgreementMutation$data = {
  readonly updateMarketingAgreement: {
    readonly error: {
      readonly __typename: "UnexpectedError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
    readonly viewer: {
      readonly id: string;
      readonly marketingAgreed: boolean;
    } | null | undefined;
  };
};
export type useUpdateMarketingAgreementMutation = {
  response: useUpdateMarketingAgreementMutation$data;
  variables: useUpdateMarketingAgreementMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateMarketingAgreementResult",
    "kind": "LinkedField",
    "name": "updateMarketingAgreement",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
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
            "name": "marketingAgreed",
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
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateMarketingAgreementMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "useUpdateMarketingAgreementMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "b91f05ad8ca7ab859db6658dce323190",
    "id": null,
    "metadata": {},
    "name": "useUpdateMarketingAgreementMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateMarketingAgreementMutation(\n  $input: UpdateMarketingAgreementInput!\n) {\n  updateMarketingAgreement(input: $input) {\n    viewer {\n      id\n      marketingAgreed\n    }\n    error {\n      __typename\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f421a7fb6e82c1497955a9c313a99e86";

export default node;
