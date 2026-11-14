/**
 * @generated SignedSource<<06010d7d6481af9b40bc78dc5117ade0>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ImageContentType = "HEIC" | "JPEG" | "PNG" | "WEBP" | "%future added value";
export type ImageUploadPurpose = "GROUP" | "PROFILE" | "%future added value";
export type CreateImageUploadUrlInput = {
  byteSize: number;
  contentType: ImageContentType;
  purpose: ImageUploadPurpose;
};
export type useUploadGroupImageMutation$variables = {
  input: CreateImageUploadUrlInput;
};
export type useUploadGroupImageMutation$data = {
  readonly createImageUploadUrl: {
    readonly error: {
      readonly __typename: string;
    } | null | undefined;
    readonly imageId: string | null | undefined;
    readonly uploadUrl: string | null | undefined;
  };
};
export type useUploadGroupImageMutation = {
  response: useUploadGroupImageMutation$data;
  variables: useUploadGroupImageMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateImageUploadUrlResult",
    "kind": "LinkedField",
    "name": "createImageUploadUrl",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "uploadUrl",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "imageId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "error",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUploadGroupImageMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "useUploadGroupImageMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "2013a7fc48669d61e5affb001f3cda2f",
    "id": null,
    "metadata": {},
    "name": "useUploadGroupImageMutation",
    "operationKind": "mutation",
    "text": "mutation useUploadGroupImageMutation(\n  $input: CreateImageUploadUrlInput!\n) {\n  createImageUploadUrl(input: $input) {\n    uploadUrl\n    imageId\n    error {\n      __typename\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0de539657d6527429f558813bfd179a3";

export default node;
