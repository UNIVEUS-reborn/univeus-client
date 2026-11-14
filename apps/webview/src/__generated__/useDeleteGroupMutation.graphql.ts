/**
 * @generated SignedSource<<c51ac47ba23adc071d34cf655cb03961>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type DeleteGroupInput = {
  groupId: string;
};
export type useDeleteGroupMutation$variables = {
  connections: ReadonlyArray<string>;
  input: DeleteGroupInput;
};
export type useDeleteGroupMutation$data = {
  readonly deleteGroup: {
    readonly deletedId: string | null | undefined;
    readonly error: {
      readonly __typename: "NotFoundGroup";
      readonly message: string;
    } | {
      readonly __typename: "NotGroupHost";
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
export type useDeleteGroupMutation = {
  response: useDeleteGroupMutation$data;
  variables: useDeleteGroupMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "deletedId",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "message",
    "storageKey": null
  }
],
v5 = {
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
      "selections": (v4/*:: as any*/),
      "type": "NotFoundGroup",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v4/*:: as any*/),
      "type": "NotGroupHost",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v4/*:: as any*/),
      "type": "UnexpectedError",
      "abstractKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useDeleteGroupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "DeleteGroupResult",
        "kind": "LinkedField",
        "name": "deleteGroup",
        "plural": false,
        "selections": [
          (v3/*:: as any*/),
          (v5/*:: as any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "useDeleteGroupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "DeleteGroupResult",
        "kind": "LinkedField",
        "name": "deleteGroup",
        "plural": false,
        "selections": [
          (v3/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "deletedId",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          },
          (v5/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "58e001742e8fcacb25ca390454385e13",
    "id": null,
    "metadata": {},
    "name": "useDeleteGroupMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteGroupMutation(\n  $input: DeleteGroupInput!\n) {\n  deleteGroup(input: $input) {\n    deletedId\n    error {\n      __typename\n      ... on NotFoundGroup {\n        message\n      }\n      ... on NotGroupHost {\n        message\n      }\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fa9534b362747869c7bb68a24c0347fd";

export default node;
