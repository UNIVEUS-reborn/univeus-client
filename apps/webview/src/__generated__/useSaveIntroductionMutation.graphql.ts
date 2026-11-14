/**
 * @generated SignedSource<<83708e0ae602eef8e6a41ef8bbebff0d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaveIntroductionInput = {
  collegeGoal?: string | null | undefined;
  favoriteFood?: string | null | undefined;
  interest?: string | null | undefined;
  matchingPerson?: string | null | undefined;
  mbti?: string | null | undefined;
  recentSong?: string | null | undefined;
};
export type useSaveIntroductionMutation$variables = {
  input: SaveIntroductionInput;
};
export type useSaveIntroductionMutation$data = {
  readonly saveIntroduction: {
    readonly error: {
      readonly __typename: "InvalidIntroductionInputError";
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
      readonly introduction: {
        readonly collegeGoal: string | null | undefined;
        readonly favoriteFood: string | null | undefined;
        readonly interest: string | null | undefined;
        readonly matchingPerson: string | null | undefined;
        readonly mbti: string | null | undefined;
        readonly recentSong: string | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"IntroductionAnswers_userIntroduction">;
      } | null | undefined;
    } | null | undefined;
  };
};
export type useSaveIntroductionMutation = {
  response: useSaveIntroductionMutation$data;
  variables: useSaveIntroductionMutation$variables;
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
  "name": "mbti",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "favoriteFood",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "recentSong",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "interest",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "matchingPerson",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "collegeGoal",
  "storageKey": null
},
v9 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "message",
    "storageKey": null
  }
],
v10 = {
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
      "selections": (v9/*:: as any*/),
      "type": "InvalidIntroductionInputError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v9/*:: as any*/),
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
    "name": "useSaveIntroductionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "SaveIntroductionResult",
        "kind": "LinkedField",
        "name": "saveIntroduction",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "UserIntroduction",
                "kind": "LinkedField",
                "name": "introduction",
                "plural": false,
                "selections": [
                  (v3/*:: as any*/),
                  (v4/*:: as any*/),
                  (v5/*:: as any*/),
                  (v6/*:: as any*/),
                  (v7/*:: as any*/),
                  (v8/*:: as any*/),
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
          },
          (v10/*:: as any*/)
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
    "name": "useSaveIntroductionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "SaveIntroductionResult",
        "kind": "LinkedField",
        "name": "saveIntroduction",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "UserIntroduction",
                "kind": "LinkedField",
                "name": "introduction",
                "plural": false,
                "selections": [
                  (v3/*:: as any*/),
                  (v4/*:: as any*/),
                  (v5/*:: as any*/),
                  (v6/*:: as any*/),
                  (v7/*:: as any*/),
                  (v8/*:: as any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v10/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5615cc660780c9321520c92851953e6f",
    "id": null,
    "metadata": {},
    "name": "useSaveIntroductionMutation",
    "operationKind": "mutation",
    "text": "mutation useSaveIntroductionMutation(\n  $input: SaveIntroductionInput!\n) {\n  saveIntroduction(input: $input) {\n    user {\n      id\n      introduction {\n        mbti\n        favoriteFood\n        recentSong\n        interest\n        matchingPerson\n        collegeGoal\n        ...IntroductionAnswers_userIntroduction\n      }\n    }\n    error {\n      __typename\n      ... on InvalidIntroductionInputError {\n        message\n      }\n      ... on UnexpectedError {\n        message\n      }\n    }\n  }\n}\n\nfragment IntroductionAnswers_userIntroduction on UserIntroduction {\n  mbti\n  favoriteFood\n  recentSong\n  interest\n  matchingPerson\n  collegeGoal\n}\n"
  }
};
})();

(node as any).hash = "18eeb241357631c6aed526b8c5c0ad18";

export default node;
