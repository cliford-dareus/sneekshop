import { FileWithPath } from "react-dropzone";
export type CartItems = {
  id: string;
  quantity: number;
};

export type FileWithPreview = FileWithPath & {
  preview: string;
};
