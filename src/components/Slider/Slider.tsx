import React, { useState, useEffect } from "react";
import styles from "./Slider.module.css";
/* import scaleIcon from "../../assets/icons/scaleIcon.svg";
 */var classNames = require("classnames");

type SliderT = {
	images: {
		src: string;
		alt?: string;
		caption?: string;
	}[];
	bordered?: boolean
};

export const Slider: React.FC<SliderT> = ({ images, bordered }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const captionClassName = classNames(styles.slide_caption, {
		[styles.single]: images.length <= 1,
	});

	const slideContainerClassName = classNames(
		styles.slide_container,
		{[styles.bordered] : bordered}
	)
	useEffect(() => {
		const slideEl = document.getElementById(`slide-${activeIndex}`);
		slideEl?.scrollIntoView({
			block: "nearest",
			inline: "center",
			behavior: "smooth",
		});
	}, [activeIndex]);

	const goToIndex = (newIndex: number) => {
		setActiveIndex(newIndex);
	};
	/* const indicators = images.map((item, index) => {
		return (
			<div
				id={`indicator-${index}`}
				onClick={() => goToIndex(index)}
				className={`${styles.indicator} ${
					activeIndex === index ? styles.active : ""
				}`}
				key={item.src + index}
			></div>
		);
	}); */

	const slides = images.map((item, index) => {
		return (
			<div
				className={slideContainerClassName}
				id={`slide-${index}`}
				onClick={() => goToIndex(index)}
				key={item.src + index}
			>
					<img className={styles.image} alt={item.alt} src={item.src}/>

				{item.caption && (
					<div className={captionClassName}>
						<p className={styles.caption_text}>{item.caption}</p>
					</div>
				)}
			</div>
		);
	});

	return (
		<div className={styles.slider_wrapper}>
			<div className={styles.slides_container}>{slides}</div>
		{/* 	{images.length > 1 && (
				<div className={styles.indicators_container}>{indicators}</div>
			)} */}
		</div>
	);
};
