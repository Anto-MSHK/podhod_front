import React from "react";

export const PreviewLayout = ({children} : any) => {
	return (
		<div>
			<span>Тут шапка</span>
				{children}
			<span>Тут bottomMenu</span>
		</div>
	);
};