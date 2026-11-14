/**
 * @generated SignedSource<<8abd5a7ce0cb5ffd23e907e4abd9d7c1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type College = "ARTS_AND_PHYSICAL_EDUCATION" | "CONVERGENCE_SCIENCE" | "CREATIVE_ENGINEERING" | "HUMANITIES" | "SOCIAL_SCIENCES" | "SOFTWARE_AND_BUSINESS" | "TOURISM_AND_CULTURE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type GroupDetailHost_group$data = {
  readonly host: {
    readonly _id: string;
    readonly admissionYear: number;
    readonly college: College;
    readonly isVerified: boolean;
    readonly isViewer: boolean;
    readonly nickname: string;
    readonly " $fragmentSpreads": FragmentRefs<"UserAvatar_user">;
  };
  readonly " $fragmentType": "GroupDetailHost_group";
};
export type GroupDetailHost_group$key = {
  readonly " $data"?: GroupDetailHost_group$data;
  readonly " $fragmentSpreads": FragmentRefs<"GroupDetailHost_group">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GroupDetailHost_group",
  "selections": [
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
          "name": "_id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isViewer",
          "storageKey": null
        },
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
          "name": "isVerified",
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
      "storageKey": null
    }
  ],
  "type": "Group",
  "abstractKey": null
};

(node as any).hash = "7a610e10a5613b59026e3b36ac591a55";

export default node;
