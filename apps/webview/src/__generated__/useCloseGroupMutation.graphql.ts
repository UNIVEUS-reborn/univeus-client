/**
 * @generated SignedSource<<897d2b14e871a7b69cd4d396cd2117cb>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type GroupStatus = "CLOSED_BY_HOST" | "CLOSED_DEADLINE" | "CLOSED_FULL" | "RECRUITING" | "%future added value";
export type CloseGroupInput = {
  groupId: string;
};
export type useCloseGroupMutation$variables = {
  input: CloseGroupInput;
};
export type useCloseGroupMutation$data = {
  readonly closeGroup: {
    readonly error: {
      readonly __typename: "GroupAlreadyClosed";
      readonly message: string;
    } | {
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
    readonly group: {
      readonly id: string;
      readonly status: GroupStatus;
    } | null | undefined;
  };
};
export type useCloseGroupMutation = {
  response: useCloseGroupMutation$data;
  variables: useCloseGroupMutation$variables;
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
    "concreteType": "CloseGroupResult",
    "kind": "LinkedField",
    "name": "closeGroup",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Group",
        "kind": "LinkedField",
        "name": "group",
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
            "selections": (v1/*:: as any*/),
            "type": "NotFoundGroup",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": (v1/*:: as any*/),
            "type": "NotGroupHost",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": (v1/*:: as any*/),
            "type": "GroupAlreadyClosed",
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
    "name": "useCloseGroupMutation",
    "selections": (v2/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "useCloseGroupMutation",
    "selections": (v2/*:: as any*/)
  },
  "params": {
    "cacheID": "1407f69db4f472ace371dcf7199abe0d",
    "id": null,
    "metadata": {},
    "name": "useCloseGroupMutation",
    "operationKind": "mutation",
    "text": "mutation useCloseGroupMutation(\n  $input: CloseGroupInput!\n) {\n  closeGroup(input: $input) {\n    group {\n      id\n      status\n    }\n    error {\n      __typename\n      ... on NotFoundGroup {\n        message\n      }\n      ... on NotGroupHost {\n        message\n      }\n      ... on GroupAlreadyClosed {\n        message\n      }\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "81bed0f3554965c396bc075d92ca2a04";

export default node;
