import React, { useState } from "react";
import { css } from "@emotion/react";
import {PulseLoader, PropagateLoader, ScaleLoader} from "react-spinners";


const override = css`
	display: block;
	margin: 20px auto;
	padding: 30px;
`;

export default function Spinner() {
	// State to show/hide loading spinner
	const [loading, setLoading] = useState(true);
	

	return (
		<div className="sweet-loading">
			<button onClick={() => setLoading(!loading)}>Loading</button>

			<PulseLoader
				color="#FF7000"
				loading={loading}
				css={override}
				size={150}
			/>

			<PropagateLoader color="#fff" loading={loading} css={override} size={15} />

			<ScaleLoader color="#fff" loading={loading} css={override} height={50} width={8} radius={4} />
		</div>
	);
}