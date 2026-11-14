/**
 * @generated SignedSource<<9c03bae57ea8973c87f905a45023aab8>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GroupDetailBody_group$data = {
  readonly content: string;
  readonly images: ReadonlyArray<{
    readonly id: string;
    readonly url: string;
  }>;
  readonly title: string;
  readonly " $fragmentType": "GroupDetailBody_group";
};
export type GroupDetailBody_group$key = {
  readonly " $data"?: GroupDetailBody_group$data;
  readonly " $fragmentSpreads": FragmentRefs<"GroupDetailBody_group">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GroupDetailBody_group",
  "selections": [
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
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
  "type": "Group",
  "abstractKey": null
};

(node as any).hash = "86c24868a81402e2c811ef459be851ae";

export default node;
