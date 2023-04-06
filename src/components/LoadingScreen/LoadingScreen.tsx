import React, { FC, useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenI {
	isLoading: boolean;
}

export const LoadingScreen: FC<LoadingScreenI> = ({ isLoading }) => {
	const [spinnerCount, setSpinnerCount] = useState(165);

	useEffect(() => {
		const updateSpinnerCount = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			const spinnersPerRow = Math.ceil(width / 100);
			const numberOfRows = Math.ceil(height / 100);
			setSpinnerCount(spinnersPerRow * numberOfRows);
		};

		window.addEventListener("resize", updateSpinnerCount);
		updateSpinnerCount();

		return () => {
			window.removeEventListener("resize", updateSpinnerCount);
		};
	}, []);

	useEffect(() => {
		const handleClassChange = () => {
			if (isLoading) {
				document.body.classList.add("no-scrollbar");
				document.body.style.overflow = "hidden";
			} else {
				document.body.classList.remove("no-scrollbar");
				document.body.style.overflow = "auto";
			}
		};

		handleClassChange();

		return () => {
			document.body.classList.remove("no-scrollbar");
			document.body.style.overflow = "auto";
		};
	}, [isLoading]);

	return (
		<>
			<div className={styles.loading_screen}>
				{[...Array(spinnerCount)].map((_, index) => (
					<Spinner key={index} type="grow" className={styles.spinner} />
				))}
			</div>
		</>
	);
};
