import React from 'react';
import 'tachyons';

const Rank = ({ name, entries }: { name: string; entries: number }) => {
	return (
		<React.StrictMode>
			<div>
				<div className="white f3">{`${name}, your current entry count is...`}</div>
				<div className="white f1">{`#${entries}`}</div>
			</div>
		</React.StrictMode>
	);
};

export default Rank;
