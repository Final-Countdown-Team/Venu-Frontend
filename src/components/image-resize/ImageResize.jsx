import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import prettyBytes from "pretty-bytes";

import React from "react";

function ImageResize({ title, description, file }) {
	const [image, setImage] = useState();

	const handleImage = (image) => {
		setImage(image);
	};

	useEffect(() => {
		if (file) {
			console.log("File received", file);
			try {
				Resizer.imageFileResizer(
					file,
					230,
					120,
					"JPEG",
					50,
					0,
					(blob) => {
						handleImage({
							url: URL.createObjectURL(blob),
							size: blob.size,
							type: blob.type,
							name: file.name,
						});
					},
					"blob",
					50,
					50
				);
			} catch (error) {
				console.log(error);
			}
		}
	}, [file]);

	if (!image) return file;

	return (
		<div>
			<>
				<h1>{title}</h1>
				<p>{description}</p>
				<figure>{`${prettyBytes(image.size)} ${image.type}`} </figure>
				<img src={image.url} alt={image.name} style={{ maxWidth: "100%" }} />
			</>
		</div>
	);
}

export default ImageResize;
