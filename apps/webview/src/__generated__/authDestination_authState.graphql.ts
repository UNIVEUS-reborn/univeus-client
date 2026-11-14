/**
 * @generated SignedSource<<102a8a02f50d217ea13ed43b749894db>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderInlineDataFragment } from 'relay-runtime';
export type AuthStatus = "SIGNED_IN" | "SIGNED_OUT" | "SIGNING_UP" | "%future added value";
export type SignupStep = "AFFILIATION" | "IDENTITY_VERIFICATION" | "PROFILE" | "TERMS_AGREEMENT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type authDestination_authState$data = {
  readonly signupStep: SignupStep | null | undefined;
  readonly status: AuthStatus;
  readonly " $fragmentType": "authDestination_authState";
};
export type authDestination_authState$key = {
  readonly " $data"?: authDestination_authState$data;
  readonly " $fragmentSpreads": FragmentRefs<"authDestination_authState">;
};

const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "authDestination_authState"
};

(node as any).hash = "db94c96e85d25230e1cb22ea0b7f4160";

export default node;
