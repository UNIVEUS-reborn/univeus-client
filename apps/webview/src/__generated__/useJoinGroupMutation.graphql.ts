/**
 * @generated SignedSource<<9ab6291e209e95162405e5b9a8eb91d2>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GroupViewerRole = "HOST" | "NONE" | "PARTICIPANT" | "PENDING" | "%future added value";
export type JoinGroupInput = {
  groupId: string;
};
export type useJoinGroupMutation$variables = {
  input: JoinGroupInput;
};
export type useJoinGroupMutation$data = {
  readonly joinGroup: {
    readonly error: {
      readonly __typename: "AlreadyJoinedGroupError";
      readonly message: string;
    } | {
      readonly __typename: "GenderRestrictedGroupError";
      readonly message: string;
    } | {
      readonly __typename: "GroupAlreadyClosedError";
      readonly message: string;
    } | {
      readonly __typename: "NotFoundGroupError";
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
      readonly viewerRole: GroupViewerRole;
      readonly " $fragmentSpreads": FragmentRefs<"GroupDetailInfo_group" | "GroupParticipants_group" | "groupHostAction_group" | "groupJoinAction_group">;
    } | null | undefined;
  };
};
export type useJoinGroupMutation = {
  response: useJoinGroupMutation$data;
  variables: useJoinGroupMutation$variables;
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
  "name": "viewerRole",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerJoinRestriction",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "message",
    "storageKey": null
  }
],
v7 = {
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
      "selections": (v6/*:: as any*/),
      "type": "NotFoundGroupError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v6/*:: as any*/),
      "type": "GroupAlreadyClosedError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v6/*:: as any*/),
      "type": "AlreadyJoinedGroupError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v6/*:: as any*/),
      "type": "GenderRestrictedGroupError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v6/*:: as any*/),
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
    "name": "useJoinGroupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "JoinGroupResult",
        "kind": "LinkedField",
        "name": "joinGroup",
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
              (v2/*:: as any*/),
              (v3/*:: as any*/),
              {
                "kind": "InlineDataFragmentSpread",
                "name": "groupJoinAction_group",
                "selections": [
                  (v4/*:: as any*/),
                  (v3/*:: as any*/),
                  (v5/*:: as any*/)
                ],
                "args": null,
                "argumentDefinitions": []
              },
              {
                "kind": "InlineDataFragmentSpread",
                "name": "groupHostAction_group",
                "selections": [
                  (v4/*:: as any*/),
                  (v3/*:: as any*/)
                ],
                "args": null,
                "argumentDefinitions": []
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "GroupParticipants_group"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "GroupDetailInfo_group"
              }
            ],
            "storageKey": null
          },
          (v7/*:: as any*/)
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
    "name": "useJoinGroupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "JoinGroupResult",
        "kind": "LinkedField",
        "name": "joinGroup",
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
              (v2/*:: as any*/),
              (v3/*:: as any*/),
              (v4/*:: as any*/),
              (v5/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Participation",
                "kind": "LinkedField",
                "name": "participations",
                "plural": true,
                "selections": [
                  (v2/*:: as any*/),
                  (v4/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "_id",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isViewer",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "nickname",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "admissionYear",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "college",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "gender",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "profileImage",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": null
                          },
                          (v2/*:: as any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*:: as any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "participantCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "capacity",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "genderRestriction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "recruitDeadlineAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "meetingAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "location",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v7/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6f8d6c1692555d8d44cacc895d3964f1",
    "id": null,
    "metadata": {},
    "name": "useJoinGroupMutation",
    "operationKind": "mutation",
    "text": "mutation useJoinGroupMutation(\n  $input: JoinGroupInput!\n) {\n  joinGroup(input: $input) {\n    group {\n      id\n      viewerRole\n      ...groupJoinAction_group\n      ...groupHostAction_group\n      ...GroupParticipants_group\n      ...GroupDetailInfo_group\n    }\n    error {\n      __typename\n      ... on NotFoundGroupError {\n        message\n      }\n      ... on GroupAlreadyClosedError {\n        message\n      }\n      ... on AlreadyJoinedGroupError {\n        message\n      }\n      ... on GenderRestrictedGroupError {\n        message\n      }\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n\nfragment GroupDetailInfo_group on Group {\n  participantCount\n  capacity\n  genderRestriction\n  recruitDeadlineAt\n  meetingAt\n  location\n}\n\nfragment GroupParticipants_group on Group {\n  status\n  viewerRole\n  participations {\n    id\n    ...ParticipantCard_participation\n  }\n}\n\nfragment ParticipantCard_participation on Participation {\n  id\n  status\n  user {\n    _id\n    isViewer\n    nickname\n    admissionYear\n    college\n    ...UserAvatar_user\n    id\n  }\n}\n\nfragment UserAvatar_user on User {\n  gender\n  profileImage {\n    url\n    id\n  }\n}\n\nfragment groupHostAction_group on Group {\n  status\n  viewerRole\n}\n\nfragment groupJoinAction_group on Group {\n  status\n  viewerRole\n  viewerJoinRestriction\n}\n"
  }
};
})();

(node as any).hash = "2ada30a154dce8f5f3437679b17281fb";

export default node;
