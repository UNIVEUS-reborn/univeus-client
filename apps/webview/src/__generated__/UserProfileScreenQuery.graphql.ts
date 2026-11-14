/**
 * @generated SignedSource<<601c4dffb19237df809db8719465a2e1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserProfileScreenQuery$variables = {
  userId: string;
};
export type UserProfileScreenQuery$data = {
  readonly user: {
    readonly createdGroupCount: number;
    readonly id: string;
    readonly introduction: {
      readonly " $fragmentSpreads": FragmentRefs<"IntroductionAnswers_userIntroduction">;
    } | null | undefined;
    readonly joinedGroupCount: number;
    readonly " $fragmentSpreads": FragmentRefs<"UserProfileCard_user">;
  } | null | undefined;
};
export type UserProfileScreenQuery = {
  response: UserProfileScreenQuery$data;
  variables: UserProfileScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "userId",
    "variableName": "userId"
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
  "name": "createdGroupCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "joinedGroupCount",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserProfileScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          (v4/*:: as any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserProfileCard_user"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "UserIntroduction",
            "kind": "LinkedField",
            "name": "introduction",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "IntroductionAnswers_userIntroduction"
              }
            ],
            "storageKey": null
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
    "name": "UserProfileScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          (v4/*:: as any*/),
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
          {
            "alias": null,
            "args": null,
            "concreteType": "UserIntroduction",
            "kind": "LinkedField",
            "name": "introduction",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "mbti",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "favoriteFood",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "recentSong",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "interest",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "matchingPerson",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "collegeGoal",
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
    "cacheID": "8e2775aad4d5b0305ef93000a83c406a",
    "id": null,
    "metadata": {},
    "name": "UserProfileScreenQuery",
    "operationKind": "query",
    "text": "query UserProfileScreenQuery(\n  $userId: ID!\n) {\n  user(userId: $userId) {\n    id\n    createdGroupCount\n    joinedGroupCount\n    ...UserProfileCard_user\n    introduction {\n      ...IntroductionAnswers_userIntroduction\n    }\n  }\n}\n\nfragment IntroductionAnswers_userIntroduction on UserIntroduction {\n  mbti\n  favoriteFood\n  recentSong\n  interest\n  matchingPerson\n  collegeGoal\n}\n\nfragment UserAvatar_user on User {\n  gender\n  profileImage {\n    url\n    id\n  }\n}\n\nfragment UserProfileCard_user on User {\n  nickname\n  admissionYear\n  college\n  ...UserAvatar_user\n}\n"
  }
};
})();

(node as any).hash = "1af682f5c03959d56ff29dc26848a944";

export default node;
