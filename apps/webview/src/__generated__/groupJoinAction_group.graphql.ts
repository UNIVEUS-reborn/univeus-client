/**
 * @generated SignedSource<<da90431e8dc50ececd2d2b29cc180c6f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderInlineDataFragment } from 'relay-runtime';
export type GroupJoinRestriction = "GENDER" | "NONE" | "%future added value";
export type GroupStatus = "CLOSED_BY_HOST" | "CLOSED_DEADLINE" | "CLOSED_FULL" | "RECRUITING" | "%future added value";
export type GroupViewerRole = "HOST" | "NONE" | "PARTICIPANT" | "PENDING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type groupJoinAction_group$data = {
  readonly status: GroupStatus;
  readonly viewerJoinRestriction: GroupJoinRestriction;
  readonly viewerRole: GroupViewerRole;
  readonly " $fragmentType": "groupJoinAction_group";
};
export type groupJoinAction_group$key = {
  readonly " $data"?: groupJoinAction_group$data;
  readonly " $fragmentSpreads": FragmentRefs<"groupJoinAction_group">;
};

const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "groupJoinAction_group"
};

(node as any).hash = "89854c094420f789561a891573e086ab";

export default node;
