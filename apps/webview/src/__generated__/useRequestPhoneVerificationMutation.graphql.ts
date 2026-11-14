/**
 * @generated SignedSource<<e1fcd32d93fdcd82a2da89803e292ab8>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type RequestPhoneVerificationInput = {
  phoneNumber: string;
};
export type useRequestPhoneVerificationMutation$variables = {
  input: RequestPhoneVerificationInput;
};
export type useRequestPhoneVerificationMutation$data = {
  readonly requestPhoneVerification: {
    readonly error: {
      readonly __typename: "InvalidPhoneNumberError";
      readonly message: string;
    } | {
      readonly __typename: "UnexpectedError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
    readonly success: boolean | null | undefined;
  };
};
export type useRequestPhoneVerificationMutation = {
  response: useRequestPhoneVerificationMutation$data;
  variables: useRequestPhoneVerificationMutation$variables;
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
    "args": null,
    "kind": "ScalarField",
    "name": "message",
    "storageKey": null
  }
],
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "RequestPhoneVerificationResult",
    "kind": "LinkedField",
    "name": "requestPhoneVerification",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
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
            "selections": (v1/*:: as any*/),
            "type": "InvalidPhoneNumberError",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": (v1/*:: as any*/),
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
    "name": "useRequestPhoneVerificationMutation",
    "selections": (v2/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "useRequestPhoneVerificationMutation",
    "selections": (v2/*:: as any*/)
  },
  "params": {
    "cacheID": "77509642052e4e74005118e4e55e5ba1",
    "id": null,
    "metadata": {},
    "name": "useRequestPhoneVerificationMutation",
    "operationKind": "mutation",
    "text": "mutation useRequestPhoneVerificationMutation(\n  $input: RequestPhoneVerificationInput!\n) {\n  requestPhoneVerification(input: $input) {\n    success\n    error {\n      __typename\n      ... on InvalidPhoneNumberError {\n        message\n      }\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "076e2aa228ca380c17f280e3cd327b9b";

export default node;
