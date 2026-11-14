/**
 * @generated SignedSource<<d94bbebc4c6db0e5435acabe4693a1fd>>
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
      readonly __typename: "GroupAlreadyClosedError";
      readonly message: string;
    } | {
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
            "type": "NotFoundGroupError",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": (v1/*:: as any*/),
            "type": "NotGroupHostError",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": (v1/*:: as any*/),
            "type": "GroupAlreadyClosedError",
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
    "cacheID": "820c9dadb5805672d75d966416104e23",
    "id": null,
    "metadata": {},
    "name": "useCloseGroupMutation",
    "operationKind": "mutation",
    "text": "mutation useCloseGroupMutation(\n  $input: CloseGroupInput!\n) {\n  closeGroup(input: $input) {\n    group {\n      id\n      status\n    }\n    error {\n      __typename\n      ... on NotFoundGroupError {\n        message\n      }\n      ... on NotGroupHostError {\n        message\n      }\n      ... on GroupAlreadyClosedError {\n        message\n      }\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "01f493148fae138a1a11179ad74d6726";

export default node;
