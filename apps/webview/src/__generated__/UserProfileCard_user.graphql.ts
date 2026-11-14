/**
 * @generated SignedSource<<ee373c985d9519fbad413c3412a3083f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type College = "ARTS_AND_PHYSICAL_EDUCATION" | "CONVERGENCE_SCIENCE" | "CREATIVE_ENGINEERING" | "HUMANITIES" | "SOCIAL_SCIENCES" | "SOFTWARE_AND_BUSINESS" | "TOURISM_AND_CULTURE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type UserProfileCard_user$data = {
  readonly admissionYear: number;
  readonly college: College;
  readonly nickname: string;
  readonly " $fragmentSpreads": FragmentRefs<"UserAvatar_user">;
  readonly " $fragmentType": "UserProfileCard_user";
};
export type UserProfileCard_user$key = {
  readonly " $data"?: UserProfileCard_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserProfileCard_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserProfileCard_user",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserAvatar_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "91ad4d4da64b3976ff79a33a28c8e015";

export default node;
