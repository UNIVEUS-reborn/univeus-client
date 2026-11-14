/**
 * @generated SignedSource<<4edc2c2602081eea84b8603e21e66bf7>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IntroductionAnswers_userIntroduction$data = {
  readonly collegeGoal: string | null | undefined;
  readonly favoriteFood: string | null | undefined;
  readonly interest: string | null | undefined;
  readonly matchingPerson: string | null | undefined;
  readonly mbti: string | null | undefined;
  readonly recentSong: string | null | undefined;
  readonly " $fragmentType": "IntroductionAnswers_userIntroduction";
};
export type IntroductionAnswers_userIntroduction$key = {
  readonly " $data"?: IntroductionAnswers_userIntroduction$data;
  readonly " $fragmentSpreads": FragmentRefs<"IntroductionAnswers_userIntroduction">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IntroductionAnswers_userIntroduction",
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
  "type": "UserIntroduction",
  "abstractKey": null
};

(node as any).hash = "061fddc83213cb862966ab1172ae2f06";

export default node;
