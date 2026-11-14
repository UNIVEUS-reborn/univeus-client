/**
 * @generated SignedSource<<f2520b0032b151fb854fa50627275b42>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GenderRestriction = "ANY" | "FEMALE_ONLY" | "MALE_ONLY" | "%future added value";
export type GroupCategory = "CAREER" | "CLASS_FRIEND" | "ETC" | "FOOD" | "FREE_PERIOD" | "HABIT" | "HOBBY_CULTURE" | "JOB_HUNTING" | "%future added value";
export type ParticipationMethod = "AUTO_APPROVAL" | "MANUAL_APPROVAL" | "%future added value";
export type UpdateGroupInput = {
  capacity: number;
  category: GroupCategory;
  content: string;
  genderRestriction: GenderRestriction;
  groupId: string;
  imageIds: ReadonlyArray<string>;
  location: string;
  meetingAt: string;
  participationMethod: ParticipationMethod;
  title: string;
};
export type useUpdateGroupMutation$variables = {
  input: UpdateGroupInput;
};
export type useUpdateGroupMutation$data = {
  readonly updateGroup: {
    readonly error: {
      readonly __typename: "CapacityBelowParticipantsError";
      readonly message: string;
    } | {
      readonly __typename: "GroupAlreadyClosedError";
      readonly message: string;
    } | {
      readonly __typename: "InvalidGroupInputError";
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
      readonly " $fragmentSpreads": FragmentRefs<"GroupCard_group" | "GroupDetailBody_group" | "GroupDetailHost_group" | "GroupDetailInfo_group">;
    } | null | undefined;
  };
};
export type useUpdateGroupMutation = {
  response: useUpdateGroupMutation$data;
  variables: useUpdateGroupMutation$variables;
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
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "message",
    "storageKey": null
  }
],
v4 = {
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
      "selections": (v3/*:: as any*/),
      "type": "NotFoundGroupError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v3/*:: as any*/),
      "type": "NotGroupHostError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v3/*:: as any*/),
      "type": "GroupAlreadyClosedError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v3/*:: as any*/),
      "type": "InvalidGroupInputError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v3/*:: as any*/),
      "type": "CapacityBelowParticipantsError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v3/*:: as any*/),
      "type": "UnexpectedError",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  },
  (v2/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateGroupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "UpdateGroupResult",
        "kind": "LinkedField",
        "name": "updateGroup",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "GroupCard_group"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "GroupDetailHost_group"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "GroupDetailInfo_group"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "GroupDetailBody_group"
              }
            ],
            "storageKey": null
          },
          (v4/*:: as any*/)
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
    "name": "useUpdateGroupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "UpdateGroupResult",
        "kind": "LinkedField",
        "name": "updateGroup",
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
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "category",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "images",
                "plural": true,
                "selections": (v5/*:: as any*/),
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
                "name": "meetingAt",
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
                "name": "participantCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "host",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isVerified",
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
                    "selections": (v5/*:: as any*/),
                    "storageKey": null
                  },
                  (v2/*:: as any*/),
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
                  }
                ],
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
                "name": "location",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "content",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d3862c9e48e8c0c7b26742e79bff2dc9",
    "id": null,
    "metadata": {},
    "name": "useUpdateGroupMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateGroupMutation(\n  $input: UpdateGroupInput!\n) {\n  updateGroup(input: $input) {\n    group {\n      id\n      ...GroupCard_group\n      ...GroupDetailHost_group\n      ...GroupDetailInfo_group\n      ...GroupDetailBody_group\n    }\n    error {\n      __typename\n      ... on NotFoundGroupError {\n        message\n      }\n      ... on NotGroupHostError {\n        message\n      }\n      ... on GroupAlreadyClosedError {\n        message\n      }\n      ... on InvalidGroupInputError {\n        message\n      }\n      ... on CapacityBelowParticipantsError {\n        message\n      }\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n\nfragment GroupCard_group on Group {\n  _id\n  title\n  category\n  images {\n    url\n    id\n  }\n  genderRestriction\n  meetingAt\n  capacity\n  participantCount\n  host {\n    isVerified\n    ...UserAvatar_user\n    id\n  }\n}\n\nfragment GroupDetailBody_group on Group {\n  title\n  content\n  images {\n    id\n    url\n  }\n}\n\nfragment GroupDetailHost_group on Group {\n  host {\n    nickname\n    isVerified\n    admissionYear\n    college\n    ...UserAvatar_user\n    id\n  }\n}\n\nfragment GroupDetailInfo_group on Group {\n  participantCount\n  capacity\n  genderRestriction\n  recruitDeadlineAt\n  meetingAt\n  location\n}\n\nfragment UserAvatar_user on User {\n  gender\n  profileImage {\n    url\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4b83e2d44294a8c5613590bd261a1d48";

export default node;
