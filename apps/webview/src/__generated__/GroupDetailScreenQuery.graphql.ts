/**
 * @generated SignedSource<<5ab34f34db6f5d54efacc5d0feb6ba6c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GroupCategory = "CAREER" | "CLASS_FRIEND" | "ETC" | "FOOD" | "FREE_PERIOD" | "HABIT" | "HOBBY_CULTURE" | "JOB_HUNTING" | "%future added value";
export type GroupDetailScreenQuery$variables = {
  groupId: string;
};
export type GroupDetailScreenQuery$data = {
  readonly group: {
    readonly category: GroupCategory;
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"GroupDetailBody_group" | "GroupDetailHost_group" | "GroupDetailInfo_group" | "GroupParticipants_group" | "groupHostAction_group" | "groupJoinAction_group">;
  } | null | undefined;
};
export type GroupDetailScreenQuery = {
  response: GroupDetailScreenQuery$data;
  variables: GroupDetailScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "groupId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "groupId",
    "variableName": "groupId"
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
  "name": "category",
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
  "name": "viewerRole",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerJoinRestriction",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nickname",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "admissionYear",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "college",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "gender",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "profileImage",
  "plural": false,
  "selections": [
    (v11/*:: as any*/),
    (v2/*:: as any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GroupDetailScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Group",
        "kind": "LinkedField",
        "name": "group",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          {
            "kind": "InlineDataFragmentSpread",
            "name": "groupHostAction_group",
            "selections": [
              (v4/*:: as any*/),
              (v5/*:: as any*/)
            ],
            "args": null,
            "argumentDefinitions": []
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
          },
          {
            "kind": "InlineDataFragmentSpread",
            "name": "groupJoinAction_group",
            "selections": [
              (v4/*:: as any*/),
              (v5/*:: as any*/),
              (v6/*:: as any*/)
            ],
            "args": null,
            "argumentDefinitions": []
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GroupParticipants_group"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "GroupDetailScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
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
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "host",
            "plural": false,
            "selections": [
              (v7/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isVerified",
                "storageKey": null
              },
              (v8/*:: as any*/),
              (v9/*:: as any*/),
              (v10/*:: as any*/),
              (v12/*:: as any*/),
              (v2/*:: as any*/)
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
            "name": "content",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": [
              (v2/*:: as any*/),
              (v11/*:: as any*/)
            ],
            "storageKey": null
          },
          (v6/*:: as any*/),
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
                  (v7/*:: as any*/),
                  (v8/*:: as any*/),
                  (v9/*:: as any*/),
                  (v10/*:: as any*/),
                  (v12/*:: as any*/),
                  (v2/*:: as any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "99e76acb940c69dde4cb8fbee8e73182",
    "id": null,
    "metadata": {},
    "name": "GroupDetailScreenQuery",
    "operationKind": "query",
    "text": "query GroupDetailScreenQuery(\n  $groupId: ID!\n) {\n  group(groupId: $groupId) {\n    id\n    category\n    ...groupHostAction_group\n    ...GroupDetailHost_group\n    ...GroupDetailInfo_group\n    ...GroupDetailBody_group\n    ...groupJoinAction_group\n    ...GroupParticipants_group\n  }\n}\n\nfragment GroupDetailBody_group on Group {\n  title\n  content\n  images {\n    id\n    url\n  }\n}\n\nfragment GroupDetailHost_group on Group {\n  host {\n    nickname\n    isVerified\n    admissionYear\n    college\n    ...UserAvatar_user\n    id\n  }\n}\n\nfragment GroupDetailInfo_group on Group {\n  participantCount\n  capacity\n  genderRestriction\n  recruitDeadlineAt\n  meetingAt\n  location\n}\n\nfragment GroupParticipants_group on Group {\n  status\n  viewerRole\n  participations {\n    id\n    ...ParticipantCard_participation\n  }\n}\n\nfragment ParticipantCard_participation on Participation {\n  id\n  status\n  user {\n    nickname\n    admissionYear\n    college\n    ...UserAvatar_user\n    id\n  }\n}\n\nfragment UserAvatar_user on User {\n  gender\n  profileImage {\n    url\n    id\n  }\n}\n\nfragment groupHostAction_group on Group {\n  status\n  viewerRole\n}\n\nfragment groupJoinAction_group on Group {\n  status\n  viewerRole\n  viewerJoinRestriction\n}\n"
  }
};
})();

(node as any).hash = "4da4a4cd7474d318719b5d5be2d08597";

export default node;
