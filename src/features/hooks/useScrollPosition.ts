import { useState, useEffect } from "react";

export const useScrollPosition = () => {
	const [scrollPosition, setScrollPosition] = useState(0);

	const handleScroll = () => {
		setScrollPosition(window.pageYOffset);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return scrollPosition;
};

export default useScrollPosition;
