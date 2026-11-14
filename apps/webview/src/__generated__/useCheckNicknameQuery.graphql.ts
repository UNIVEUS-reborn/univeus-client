/**
 * @generated SignedSource<<f5e472a802f33edd5eb5dc5582adce51>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type NicknameAvailability = "AVAILABLE" | "DUPLICATED" | "INVALID_FORMAT" | "%future added value";
export type useCheckNicknameQuery$variables = {
  nickname: string;
};
export type useCheckNicknameQuery$data = {
  readonly nicknameAvailability: NicknameAvailability;
};
export type useCheckNicknameQuery = {
  response: useCheckNicknameQuery$data;
  variables: useCheckNicknameQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "nickname"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "nickname",
        "variableName": "nickname"
      }
    ],
    "kind": "ScalarField",
    "name": "nicknameAvailability",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCheckNicknameQuery",
    "selections": (v1/*:: as any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "useCheckNicknameQuery",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "d63bd0d296a1e1b9ad8b318aa10c02ae",
    "id": null,
    "metadata": {},
    "name": "useCheckNicknameQuery",
    "operationKind": "query",
    "text": "query useCheckNicknameQuery(\n  $nickname: String!\n) {\n  nicknameAvailability(nickname: $nickname)\n}\n"
  }
};
})();

(node as any).hash = "4513365d0338deb310aa9305c63ee1bf";

export default node;
