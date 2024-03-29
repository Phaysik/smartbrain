import React, { useState } from "react";
import "tachyons";
import "./ImageLinkForm.css";

const ImageLinkForm = ({
	getQuery,
	onButtonClick,
}: {
	getQuery: React.Dispatch<React.SetStateAction<string>>;
	onButtonClick: any;
}) => {
	const [text, setText] = useState("");

	const onChange = (message: string) => {
		setText(message);
		getQuery(message);
	};

	return (
		<React.StrictMode>
			<div>
				<p className="f3">
					This Magic Brain will detect faces in your pictures. Give it a try.
				</p>
				<div className="center">
					<div className="form center pa4 br3 shadow-5">
						<input
							className="f4 pa2 w-70 center"
							type="text"
							value={text}
							onChange={(e) => onChange(e.target.value)}
						/>
						<button
							className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
							onClick={onButtonClick}
						>
							Detect
						</button>
					</div>
				</div>
			</div>
		</React.StrictMode>
	);
};

export default ImageLinkForm;
