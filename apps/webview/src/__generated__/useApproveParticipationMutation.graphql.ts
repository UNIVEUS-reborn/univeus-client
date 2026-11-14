/**
 * @generated SignedSource<<cbfbeeb5c7046374611ab01ff2c9f323>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ParticipationStatus = "PARTICIPATING" | "PENDING" | "%future added value";
export type ApproveParticipationInput = {
  participationId: string;
};
export type useApproveParticipationMutation$variables = {
  input: ApproveParticipationInput;
};
export type useApproveParticipationMutation$data = {
  readonly approveParticipation: {
    readonly error: {
      readonly __typename: "GroupAlreadyClosedError";
      readonly message: string;
    } | {
      readonly __typename: "NotFoundParticipationError";
      readonly message: string;
    } | {
      readonly __typename: "NotGroupHostError";
      readonly message: string;
    } | {
      readonly __typename: "ParticipationAlreadyApprovedError";
      readonly message: string;
    } | {
      readonly __typename: "UnexpectedError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
    readonly participation: {
      readonly group: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"GroupDetailInfo_group" | "GroupParticipants_group" | "groupHostAction_group">;
      };
      readonly id: string;
      readonly status: ParticipationStatus;
    } | null | undefined;
  };
};
export type useApproveParticipationMutation = {
  response: useApproveParticipationMutation$data;
  variables: useApproveParticipationMutation$variables;
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
      "type": "NotFoundParticipationError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v5/*:: as any*/),
      "type": "NotGroupHostError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v5/*:: as any*/),
      "type": "GroupAlreadyClosedError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v5/*:: as any*/),
      "type": "ParticipationAlreadyApprovedError",
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
    "name": "useApproveParticipationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "ApproveParticipationResult",
        "kind": "LinkedField",
        "name": "approveParticipation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Participation",
            "kind": "LinkedField",
            "name": "participation",
            "plural": false,
            "selections": [
              (v2/*:: as any*/),
              (v3/*:: as any*/),
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
    "name": "useApproveParticipationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "ApproveParticipationResult",
        "kind": "LinkedField",
        "name": "approveParticipation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Participation",
            "kind": "LinkedField",
            "name": "participation",
            "plural": false,
            "selections": [
              (v2/*:: as any*/),
              (v3/*:: as any*/),
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
              }
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
    "cacheID": "6d4a64d466981a9eb1f4a67085c24daa",
    "id": null,
    "metadata": {},
    "name": "useApproveParticipationMutation",
    "operationKind": "mutation",
    "text": "mutation useApproveParticipationMutation(\n  $input: ApproveParticipationInput!\n) {\n  approveParticipation(input: $input) {\n    participation {\n      id\n      status\n      group {\n        id\n        ...groupHostAction_group\n        ...GroupParticipants_group\n        ...GroupDetailInfo_group\n      }\n    }\n    error {\n      __typename\n      ... on NotFoundParticipationError {\n        message\n      }\n      ... on NotGroupHostError {\n        message\n      }\n      ... on GroupAlreadyClosedError {\n        message\n      }\n      ... on ParticipationAlreadyApprovedError {\n        message\n      }\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n\nfragment GroupDetailInfo_group on Group {\n  participantCount\n  capacity\n  genderRestriction\n  recruitDeadlineAt\n  meetingAt\n  location\n}\n\nfragment GroupParticipants_group on Group {\n  status\n  viewerRole\n  participations {\n    id\n    ...ParticipantCard_participation\n  }\n}\n\nfragment ParticipantCard_participation on Participation {\n  id\n  status\n  user {\n    nickname\n    admissionYear\n    college\n    ...UserAvatar_user\n    id\n  }\n}\n\nfragment UserAvatar_user on User {\n  gender\n  profileImage {\n    url\n    id\n  }\n}\n\nfragment groupHostAction_group on Group {\n  status\n  viewerRole\n}\n"
  }
};
})();

(node as any).hash = "823a32380ce0d48803a91eef2c884cd5";

export default node;
