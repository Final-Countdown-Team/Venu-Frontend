import { useFormikContext } from "formik";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { MdCloudUpload } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";

function ImageUploader(props) {
  const formikContext = useFormikContext(props);

  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles((prev) => {
      if (files.length + 1 > 3) return [...files];
      const processFiles = acceptedFiles.map((file, i) =>
        Object.assign(file, {
          imageId: `${file.name}-${i}`,
          preview: URL.createObjectURL(file),
        })
      );
      return [...prev, processFiles].flat();
    });
  };

  const removeImage = (e) => {
    console.log(e.currentTarget);
    const identifier = e.currentTarget.dataset.image;
    setFiles(() =>
      files.filter((el) => {
        return el.imageId !== identifier;
      })
    );
  };

  useEffect(() => {
    console.log(files);
    formikContext.setFieldValue("images", files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg", ".svg", ".webP"],
    },
    maxFiles: 3,
    onDrop: onDrop,
  });

  const imagePreview = files.map((file, i) => (
    <div className="preview" key={`${file.name}-${i}`}>
      <div className="preview--inner">
        <div
          className="preview-remove-icon"
          onClick={(e) => removeImage(e)}
          data-image={file.imageId}
        >
          <RiDeleteBack2Fill className="icon" />
        </div>
        <img
          src={file.preview}
          alt="preview"
          onLoad={() => URL.revokeObjectURL(file.preview)}
        />
      </div>
    </div>
  ));

  return (
    <>
      <div className="required-label">
        <label htmlFor="">Images:</label>
      </div>
      <div {...getRootProps()} className="image-uploader">
        <input {...getInputProps()} />
        <MdCloudUpload className="cloud-icon" />
        <p className="image-uploader-text">
          Click or drag files to this area to upload
        </p>
        <p className="image-uploader-text--thin">You can upload up to 3 images</p>
      </div>
      <div className="preview-container">{imagePreview}</div>
    </>
  );
}

export default ImageUploader;
