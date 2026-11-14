/**
 * @generated SignedSource<<4b9a7fdcb0d751ef6ed235ba0827d96c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type GenderRestriction = "ANY" | "FEMALE_ONLY" | "MALE_ONLY" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type GroupDetailInfo_group$data = {
  readonly capacity: number;
  readonly genderRestriction: GenderRestriction;
  readonly location: string;
  readonly meetingAt: string;
  readonly participantCount: number;
  readonly recruitDeadlineAt: string;
  readonly " $fragmentType": "GroupDetailInfo_group";
};
export type GroupDetailInfo_group$key = {
  readonly " $data"?: GroupDetailInfo_group$data;
  readonly " $fragmentSpreads": FragmentRefs<"GroupDetailInfo_group">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GroupDetailInfo_group",
  "selections": [
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
      "kind": "ScalarField",
      "name": "capacity",
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
      "name": "recruitDeadlineAt",
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
      "name": "location",
      "storageKey": null
    }
  ],
  "type": "Group",
  "abstractKey": null
};

(node as any).hash = "f96f4cfae8f07594ad91e86342792b11";

export default node;
