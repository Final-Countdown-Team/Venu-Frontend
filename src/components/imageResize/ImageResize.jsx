import { useState } from "react";
import Resizer from "react-image-file-resizer";


import React from "react";

function ImageResize(props) {

	const [newImage, setnewImage] = useState("");
	
	const resizeFile = (file) =>
		new Promise((resolve) => {
			Resizer.imageFileResizer(
				file,
				200,
				300,
				"JPEG",
				100,
				0,
				(uri) => {
					console.log(uri);
					setnewImage(uri);
				},
				"base64"
			);
		});

	const onChange = async (event) => {
		try {
			const file = event.target.files[0];
			const image = await resizeFile(file);
			console.log(image);
		} catch (err) {
			console.log(err);
			//test
		}
	};
	

	return (
		<div className="App">
			<input
				type="file"
				onChange={(e) => {
					onChange(e);
				}}
			/>
			<img src={newImage} alt="" />
		</div>
	);
}

export default ImageResize;
