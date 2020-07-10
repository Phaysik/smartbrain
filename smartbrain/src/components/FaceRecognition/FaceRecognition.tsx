import React from "react";
import "tachyons";
import "./FaceRecognition.css";

const FaceRecognition = ({ box, imageUrl }: { box: any; imageUrl: string }) => {
	return (
		<React.StrictMode>
			{imageUrl ? (
				<div className="center ma">
					<div className="absolute mt2">
						<img
							id="inputimage"
							src={imageUrl}
							alt="Face"
							width="500px"
							height="auto"
						/>
						<div
							className="bounding-box"
							style={{
								top: box.topRow,
								right: box.rightCol,
								bottom: box.bottomRow,
								left: box.leftCol,
							}}
						></div>
					</div>
				</div>
			) : (
				""
			)}
		</React.StrictMode>
	);
};

export default FaceRecognition;
