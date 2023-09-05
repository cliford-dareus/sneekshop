import type {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";
import React, { useCallback, useEffect } from "react";
import {
  useDropzone,
  FileWithPath,
  Accept,
  FileRejection,
} from "react-dropzone";
import { FileWithPreview } from "@/libs/type";
import Image from "next/image";
import classNames from "classnames";

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.HTMLAttributes<HTMLDivElement> {
  name: TName;
  setvalue: UseFormSetValue<TFieldValues>;
  accept?: Accept;
  maxSize?: number;
  maxFiles?: number;
  files: FileWithPreview[] | null;
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>;
  isUploading?: boolean;
  disabled?: boolean;
}

function ImagesFilesInput<TFieldValues extends FieldValues>({
  name,
  setvalue,
  setFiles,
  files,
  maxSize = 1024 * 1024 * 2,
  maxFiles = 1,
  isUploading = false,
  disabled = false,
  accept = {
    "image/*": [],
  },
  ...props
}: Props<TFieldValues>) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setFiles((prev) => [...(prev ?? []), fileWithPreview]);
      });

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === "file-too-large") {
            console.log(`File is too large. Max size is ${maxSize}`);
            return;
          }
        });
      }
    },

    [maxSize, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    disabled,
  });

  // Register files to react-hook-form
  useEffect(() => {
    setvalue(name, files as PathValue<TFieldValues, Path<TFieldValues>>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        {...getRootProps()}
        {...props}
        className={classNames(
          `h-[150px] first-letter border border-slate-700 p-4 flex items-center justify-center rounded-md mt-2" ${
            isDragActive && "border-green-600 bg-slate-700"
          } ${disabled && "pointer-events-none opacity-60"}`
        )}
      >
        <input {...getInputProps()} />
        <div>Drop or Click here to upload image!</div>
      </div>
      {files?.length && (
        <div className="mt-4">
          <p>Image Preview</p>
          <div className="flex flex-wrap gap-4 mt-4">
            {files?.map((file, i) => (
              <Image
                key={i}
                src={file?.preview}
                alt=""
                width={150}
                height={150}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ImagesFilesInput;
