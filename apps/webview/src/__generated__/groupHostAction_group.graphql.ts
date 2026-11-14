/**
 * @generated SignedSource<<d7df411c2668a27cd689673da4bc8868>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderInlineDataFragment } from 'relay-runtime';
export type GroupStatus = "CLOSED_BY_HOST" | "CLOSED_DEADLINE" | "CLOSED_FULL" | "RECRUITING" | "%future added value";
export type GroupViewerRole = "HOST" | "NONE" | "PARTICIPANT" | "PENDING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type groupHostAction_group$data = {
  readonly status: GroupStatus;
  readonly viewerRole: GroupViewerRole;
  readonly " $fragmentType": "groupHostAction_group";
};
export type groupHostAction_group$key = {
  readonly " $data"?: groupHostAction_group$data;
  readonly " $fragmentSpreads": FragmentRefs<"groupHostAction_group">;
};

const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "groupHostAction_group"
};

(node as any).hash = "058b0f142ef869b184ea893b7ccc56ad";

export default node;
