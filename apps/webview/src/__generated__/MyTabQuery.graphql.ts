/**
 * @generated SignedSource<<d34338c9926ec347d19f94eee7e065fe>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyTabQuery$variables = Record<PropertyKey, never>;
export type MyTabQuery$data = {
  readonly viewer: {
    readonly id: string;
    readonly user: {
      readonly introduction: {
        readonly __typename: "UserIntroduction";
      } | null | undefined;
      readonly isVerified: boolean;
      readonly " $fragmentSpreads": FragmentRefs<"UserProfileCard_user">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"MyCreatedGroupList_viewer" | "MyJoinedGroupList_viewer">;
  };
};
export type MyTabQuery = {
  response: MyTabQuery$data;
  variables: MyTabQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isVerified",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "UserIntroduction",
  "kind": "LinkedField",
  "name": "introduction",
  "plural": false,
  "selections": [
    (v2/*:: as any*/)
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "gender",
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
  (v0/*:: as any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "profileImage",
  "plural": false,
  "selections": (v5/*:: as any*/),
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "GroupEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Group",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v0/*:: as any*/),
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
              (v1/*:: as any*/),
              (v4/*:: as any*/),
              (v6/*:: as any*/),
              (v0/*:: as any*/)
            ],
            "storageKey": null
          },
          (v2/*:: as any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cursor",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "PageInfo",
    "kind": "LinkedField",
    "name": "pageInfo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "endCursor",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasNextPage",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyTabQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v1/*:: as any*/),
              (v3/*:: as any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "UserProfileCard_user"
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyCreatedGroupList_viewer"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyJoinedGroupList_viewer"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyTabQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v1/*:: as any*/),
              (v3/*:: as any*/),
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
              (v4/*:: as any*/),
              (v6/*:: as any*/),
              (v0/*:: as any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*:: as any*/),
            "concreteType": "GroupConnection",
            "kind": "LinkedField",
            "name": "createdGroups",
            "plural": false,
            "selections": (v8/*:: as any*/),
            "storageKey": "createdGroups(first:10)"
          },
          {
            "alias": null,
            "args": (v7/*:: as any*/),
            "filters": null,
            "handle": "connection",
            "key": "MyCreatedGroupList_viewer_createdGroups",
            "kind": "LinkedHandle",
            "name": "createdGroups"
          },
          {
            "alias": null,
            "args": (v7/*:: as any*/),
            "concreteType": "GroupConnection",
            "kind": "LinkedField",
            "name": "joinedGroups",
            "plural": false,
            "selections": (v8/*:: as any*/),
            "storageKey": "joinedGroups(first:10)"
          },
          {
            "alias": null,
            "args": (v7/*:: as any*/),
            "filters": null,
            "handle": "connection",
            "key": "MyJoinedGroupList_viewer_joinedGroups",
            "kind": "LinkedHandle",
            "name": "joinedGroups"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bffda2a0ff5ba8eea7316954eebe9a02",
    "id": null,
    "metadata": {},
    "name": "MyTabQuery",
    "operationKind": "query",
    "text": "query MyTabQuery {\n  viewer {\n    id\n    user {\n      isVerified\n      introduction {\n        __typename\n      }\n      ...UserProfileCard_user\n      id\n    }\n    ...MyCreatedGroupList_viewer\n    ...MyJoinedGroupList_viewer\n  }\n}\n\nfragment GroupCard_group on Group {\n  _id\n  title\n  category\n  images {\n    url\n    id\n  }\n  genderRestriction\n  meetingAt\n  capacity\n  participantCount\n  host {\n    isVerified\n    ...UserAvatar_user\n    id\n  }\n}\n\nfragment MyCreatedGroupList_viewer on Viewer {\n  createdGroups(first: 10) {\n    totalCount\n    edges {\n      node {\n        id\n        ...GroupCard_group\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment MyJoinedGroupList_viewer on Viewer {\n  joinedGroups(first: 10) {\n    totalCount\n    edges {\n      node {\n        id\n        ...GroupCard_group\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment UserAvatar_user on User {\n  gender\n  profileImage {\n    url\n    id\n  }\n}\n\nfragment UserProfileCard_user on User {\n  nickname\n  admissionYear\n  college\n  ...UserAvatar_user\n}\n"
  }
};
})();

(node as any).hash = "af9a53905ac736c61f58ac40a8692a30";

export default node;
