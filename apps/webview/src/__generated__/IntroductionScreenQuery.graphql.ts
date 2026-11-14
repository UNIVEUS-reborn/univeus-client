/**
 * @generated SignedSource<<5c6b9fc7839a90b1bc03f7b0ef9fbd70>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IntroductionScreenQuery$variables = Record<PropertyKey, never>;
export type IntroductionScreenQuery$data = {
  readonly viewer: {
    readonly user: {
      readonly introduction: {
        readonly " $fragmentSpreads": FragmentRefs<"IntroductionAnswers_userIntroduction">;
      } | null | undefined;
    };
  };
};
export type IntroductionScreenQuery = {
  response: IntroductionScreenQuery$data;
  variables: IntroductionScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "IntroductionScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
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
    "name": "IntroductionScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
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
              },
              (v0/*:: as any*/)
            ],
            "storageKey": null
          },
          (v0/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c6022903258702eca03d11e279f13c11",
    "id": null,
    "metadata": {},
    "name": "IntroductionScreenQuery",
    "operationKind": "query",
    "text": "query IntroductionScreenQuery {\n  viewer {\n    user {\n      introduction {\n        ...IntroductionAnswers_userIntroduction\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment IntroductionAnswers_userIntroduction on UserIntroduction {\n  mbti\n  favoriteFood\n  recentSong\n  interest\n  matchingPerson\n  collegeGoal\n}\n"
  }
};
})();

(node as any).hash = "e564095aea8abb23c5e417dd412156e6";

export default node;
