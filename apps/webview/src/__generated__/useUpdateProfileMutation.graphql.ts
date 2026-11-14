/**
 * @generated SignedSource<<bf15eb5b14caa5403690cda87820bfbb>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateProfileInput = {
  nickname: string;
  profileImageId?: string | null | undefined;
};
export type useUpdateProfileMutation$variables = {
  input: UpdateProfileInput;
};
export type useUpdateProfileMutation$data = {
  readonly updateProfile: {
    readonly error: {
      readonly __typename: "DuplicatedNicknameError";
      readonly message: string;
    } | {
      readonly __typename: "InvalidNicknameError";
      readonly message: string;
    } | {
      readonly __typename: "UnexpectedError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
    readonly user: {
      readonly id: string;
      readonly nickname: string;
      readonly profileImage: {
        readonly id: string;
        readonly url: string;
      } | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"UserProfileCard_user">;
    } | null | undefined;
  };
};
export type useUpdateProfileMutation = {
  response: useUpdateProfileMutation$data;
  variables: useUpdateProfileMutation$variables;
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
  "name": "nickname",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "profileImage",
  "plural": false,
  "selections": [
    (v2/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
      "storageKey": null
    }
  ],
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
      "type": "DuplicatedNicknameError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v5/*:: as any*/),
      "type": "InvalidNicknameError",
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
    "name": "useUpdateProfileMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "UpdateProfileResult",
        "kind": "LinkedField",
        "name": "updateProfile",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
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
    "name": "useUpdateProfileMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "UpdateProfileResult",
        "kind": "LinkedField",
        "name": "updateProfile",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
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
    "cacheID": "47c839dacaac1a1501714cddf3db0f3c",
    "id": null,
    "metadata": {},
    "name": "useUpdateProfileMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateProfileMutation(\n  $input: UpdateProfileInput!\n) {\n  updateProfile(input: $input) {\n    user {\n      id\n      nickname\n      profileImage {\n        id\n        url\n      }\n      ...UserProfileCard_user\n    }\n    error {\n      __typename\n      ... on DuplicatedNicknameError {\n        message\n      }\n      ... on InvalidNicknameError {\n        message\n      }\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n\nfragment UserAvatar_user on User {\n  gender\n  profileImage {\n    url\n    id\n  }\n}\n\nfragment UserProfileCard_user on User {\n  nickname\n  admissionYear\n  college\n  ...UserAvatar_user\n}\n"
  }
};
})();

(node as any).hash = "757141b3d705ecf8ee7f94ec7602196b";

export default node;
