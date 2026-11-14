/**
 * @generated SignedSource<<a6a94a38c44045e4525020d59905e46f>>
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
      readonly __typename: "NotFoundGroupError";
      readonly message: string;
    } | {
      readonly __typename: "NotGroupHostError";
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
      "type": "NotFoundGroupError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v4/*:: as any*/),
      "type": "NotGroupHostError",
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
    "cacheID": "8d09131fbc33cb75f279f49ba44f96de",
    "id": null,
    "metadata": {},
    "name": "useDeleteGroupMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteGroupMutation(\n  $input: DeleteGroupInput!\n) {\n  deleteGroup(input: $input) {\n    deletedId\n    error {\n      __typename\n      ... on NotFoundGroupError {\n        message\n      }\n      ... on NotGroupHostError {\n        message\n      }\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "253cef5db996aca907db351b1ca943bf";

export default node;
