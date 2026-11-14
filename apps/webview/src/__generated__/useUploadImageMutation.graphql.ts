/**
 * @generated SignedSource<<beb326c1b1625fc8453c30865e86d5a0>>
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
export type useUploadImageMutation$variables = {
  input: CreateImageUploadUrlInput;
};
export type useUploadImageMutation$data = {
  readonly createImageUploadUrl: {
    readonly error: {
      readonly __typename: string;
    } | null | undefined;
    readonly imageId: string | null | undefined;
    readonly uploadUrl: string | null | undefined;
  };
};
export type useUploadImageMutation = {
  response: useUploadImageMutation$data;
  variables: useUploadImageMutation$variables;
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
    "name": "useUploadImageMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "useUploadImageMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "68426d84277af5abd51a852101b3efdd",
    "id": null,
    "metadata": {},
    "name": "useUploadImageMutation",
    "operationKind": "mutation",
    "text": "mutation useUploadImageMutation(\n  $input: CreateImageUploadUrlInput!\n) {\n  createImageUploadUrl(input: $input) {\n    uploadUrl\n    imageId\n    error {\n      __typename\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "05ab8f9d39f2f9401b7ea132f5199f5d";

export default node;
