/**
 * @generated SignedSource<<9039195040d49dec3b45937026dfdf6b>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CancelParticipationInput = {
  groupId: string;
};
export type useCancelParticipationMutation$variables = {
  input: CancelParticipationInput;
};
export type useCancelParticipationMutation$data = {
  readonly cancelParticipation: {
    readonly error: {
      readonly __typename: "GroupAlreadyClosedError";
      readonly message: string;
    } | {
      readonly __typename: "NotFoundGroupError";
      readonly message: string;
    } | {
      readonly __typename: "NotGroupParticipantError";
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
      readonly " $fragmentSpreads": FragmentRefs<"GroupDetailInfo_group" | "GroupParticipants_group" | "groupHostAction_group" | "groupJoinAction_group">;
    } | null | undefined;
  };
};
export type useCancelParticipationMutation = {
  response: useCancelParticipationMutation$data;
  variables: useCancelParticipationMutation$variables;
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
  "name": "viewerRole",
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
      "type": "NotGroupParticipantError",
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
    "name": "useCancelParticipationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "CancelParticipationResult",
        "kind": "LinkedField",
        "name": "cancelParticipation",
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
              {
                "kind": "InlineDataFragmentSpread",
                "name": "groupJoinAction_group",
                "selections": [
                  (v3/*:: as any*/),
                  (v4/*:: as any*/),
                  (v5/*:: as any*/)
                ],
                "args": null,
                "argumentDefinitions": []
              },
              {
                "kind": "InlineDataFragmentSpread",
                "name": "groupHostAction_group",
                "selections": [
                  (v3/*:: as any*/),
                  (v4/*:: as any*/)
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
    "name": "useCancelParticipationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "CancelParticipationResult",
        "kind": "LinkedField",
        "name": "cancelParticipation",
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
                  (v3/*:: as any*/),
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
    "cacheID": "ff28d4b3b3756de5e430883c5040a8d3",
    "id": null,
    "metadata": {},
    "name": "useCancelParticipationMutation",
    "operationKind": "mutation",
    "text": "mutation useCancelParticipationMutation(\n  $input: CancelParticipationInput!\n) {\n  cancelParticipation(input: $input) {\n    group {\n      id\n      ...groupJoinAction_group\n      ...groupHostAction_group\n      ...GroupParticipants_group\n      ...GroupDetailInfo_group\n    }\n    error {\n      __typename\n      ... on NotFoundGroupError {\n        message\n      }\n      ... on GroupAlreadyClosedError {\n        message\n      }\n      ... on NotGroupParticipantError {\n        message\n      }\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n\nfragment GroupDetailInfo_group on Group {\n  participantCount\n  capacity\n  genderRestriction\n  recruitDeadlineAt\n  meetingAt\n  location\n}\n\nfragment GroupParticipants_group on Group {\n  status\n  viewerRole\n  participations {\n    id\n    ...ParticipantCard_participation\n  }\n}\n\nfragment ParticipantCard_participation on Participation {\n  id\n  status\n  user {\n    nickname\n    admissionYear\n    college\n    ...UserAvatar_user\n    id\n  }\n}\n\nfragment UserAvatar_user on User {\n  gender\n  profileImage {\n    url\n    id\n  }\n}\n\nfragment groupHostAction_group on Group {\n  status\n  viewerRole\n}\n\nfragment groupJoinAction_group on Group {\n  status\n  viewerRole\n  viewerJoinRestriction\n}\n"
  }
};
})();

(node as any).hash = "a86defbe3e0582fdb81eaee6565504ae";

export default node;
