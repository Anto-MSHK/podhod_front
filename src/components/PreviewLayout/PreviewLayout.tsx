import React from "react";

export const PreviewLayout = ({children} : any) => {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			height: '459px',
			justifyContent: 'space-between'
		}}>
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				textAlign: 'center'
			}}>
				<h1>Тут шапка</h1>
			</div>
			<div style={{
				flexGrow: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center'
			}}>
				{children}
			</div>
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				textAlign: 'center'
			}}>
				<h1>Тут bottomMenu</h1>
			</div>
		</div>

	);
};