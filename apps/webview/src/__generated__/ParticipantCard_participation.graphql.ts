/**
 * @generated SignedSource<<74659b854e65489f4e560c6b0d8607fb>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type College = "ARTS_AND_PHYSICAL_EDUCATION" | "CONVERGENCE_SCIENCE" | "CREATIVE_ENGINEERING" | "HUMANITIES" | "SOCIAL_SCIENCES" | "SOFTWARE_AND_BUSINESS" | "TOURISM_AND_CULTURE" | "%future added value";
export type ParticipationStatus = "PARTICIPATING" | "PENDING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ParticipantCard_participation$data = {
  readonly id: string;
  readonly status: ParticipationStatus;
  readonly user: {
    readonly admissionYear: number;
    readonly college: College;
    readonly nickname: string;
    readonly " $fragmentSpreads": FragmentRefs<"UserAvatar_user">;
  };
  readonly " $fragmentType": "ParticipantCard_participation";
};
export type ParticipantCard_participation$key = {
  readonly " $data"?: ParticipantCard_participation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ParticipantCard_participation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ParticipantCard_participation",
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
      "name": "status",
      "storageKey": null
    },
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
      "storageKey": null
    }
  ],
  "type": "Participation",
  "abstractKey": null
};

(node as any).hash = "10a093b61175ddf8035fd117b7cc43d1";

export default node;
