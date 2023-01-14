import { useContext } from "react";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { MdCloudUpload } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { MainContext } from "../../contexts/MainContext";

function ImageUploader({ setImageFiles }) {
  const { loggedInUser } = useContext(MainContext);
  const [files, setFiles] = useState(loggedInUser.images);
  const [error, setError] = useState("");

  const processFiles = (source) => {
    return source.map((file, i) =>
      Object.assign(file, {
        imageId: `${file.name}-${i}`,
        preview: URL.createObjectURL(file),
      })
    );
  };

  // useEffect(() => {
  //   console.log(files);
  // }, [files]);

  const onDrop = (acceptedFiles) => {
    setError("");
    if (validateFileSize(acceptedFiles[0])) return;
    console.log("Accepted: ", acceptedFiles);
    const processedFiles = processFiles(acceptedFiles);
    const newFiles = files.map((el, i) => {
      if (typeof el === "string" && el.includes("empty"))
        return processedFiles.shift() || el;
      return el;
    });
    console.log(newFiles);
    setFiles(newFiles);
  };

  const validateFileSize = (file) => {
    console.log(file.size);
    if (file.size >= 500000) {
      setError("This file is too big");
      return true;
    }
    return false;
  };

  const removeImage = (e) => {
    const identifier = e.currentTarget.dataset.image;
    setFiles(() =>
      files.map((el, i) => {
        if (el.imageId && el.imageId === identifier) return `empty-${i}`;
        if (el === identifier) return `empty-${i}`;
        return el;
      })
    );
  };

  useEffect(() => {
    setImageFiles((prev) => ({ ...prev, images: files }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg", ".svg", ".webP"],
    },
    maxFiles: 3,
    onDrop: onDrop,
  });

  return (
    <>
      <div className="required-label">
        <label>Images:</label>
      </div>
      <div {...getRootProps()} className="image-uploader">
        <input {...getInputProps()} />
        <MdCloudUpload className="cloud-icon" />
        <p className="image-uploader-text">
          Click or drag files to this area to upload
        </p>
        <p className="image-uploader-text--thin">
          You can upload up to 3 images{" "}
          <span className="size-descr">The max. size per file is 5MB</span>
        </p>
      </div>
      {error && (
        <p className="image-error">
          This file is too big. You can only upload images up to 5MB.
        </p>
      )}
      <div className="preview-container">
        {files.every((file) => file === "")
          ? null
          : files.map((file, i) => {
              return (
                <div className="preview" key={`${file.name}-${i}`}>
                  <div className="preview--inner">
                    {typeof file === "string" && file.includes("empty") ? null : (
                      <>
                        <div
                          className="preview-remove-icon"
                          onClick={(e) => removeImage(e)}
                          data-image={file.imageId ? file.imageId : file}
                        >
                          <RiDeleteBack2Fill className="icon" />
                        </div>
                        <img
                          src={file.preview ? file.preview : file}
                          alt="preview"
                          onLoad={() => URL.revokeObjectURL(file.preview)}
                        />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
}

export default ImageUploader;
