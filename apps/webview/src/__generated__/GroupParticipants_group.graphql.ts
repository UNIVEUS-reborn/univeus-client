/**
 * @generated SignedSource<<15aa52cb34fbebe8e6e5aa2587013a29>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type GroupStatus = "CLOSED_BY_HOST" | "CLOSED_DEADLINE" | "CLOSED_FULL" | "RECRUITING" | "%future added value";
export type GroupViewerRole = "HOST" | "NONE" | "PARTICIPANT" | "PENDING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type GroupParticipants_group$data = {
  readonly participations: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ParticipantCard_participation">;
  }>;
  readonly status: GroupStatus;
  readonly viewerRole: GroupViewerRole;
  readonly " $fragmentType": "GroupParticipants_group";
};
export type GroupParticipants_group$key = {
  readonly " $data"?: GroupParticipants_group$data;
  readonly " $fragmentSpreads": FragmentRefs<"GroupParticipants_group">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GroupParticipants_group",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerRole",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Participation",
      "kind": "LinkedField",
      "name": "participations",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ParticipantCard_participation"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Group",
  "abstractKey": null
};

(node as any).hash = "5abdcea65273c5cc372673df020d910b";

export default node;
