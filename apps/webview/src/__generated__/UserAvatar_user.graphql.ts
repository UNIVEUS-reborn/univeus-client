/**
 * @generated SignedSource<<ae970af2150ff60c18316072f5ad344d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type Gender = "FEMALE" | "MALE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type UserAvatar_user$data = {
  readonly gender: Gender;
  readonly profileImage: {
    readonly url: string;
  } | null | undefined;
  readonly " $fragmentType": "UserAvatar_user";
};
export type UserAvatar_user$key = {
  readonly " $data"?: UserAvatar_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserAvatar_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserAvatar_user",
  "selections": [
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "ccb21874a8e163830db06b75e76d0973";

export default node;
