import { useRef, useState, useEffect } from "react";

function useComponentSize() {
	const ref = useRef(null);
	const [size, setSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const updateSize = () => {
			if (ref.current) {
				setSize({
					width: (ref.current as any).offsetWidth,
					height: (ref.current as any).offsetHeight,
				});
			}
		};

		if (typeof ResizeObserver !== "undefined") {
			const resizeObserver = new ResizeObserver(() => updateSize());

			if (ref.current) {
				resizeObserver.observe(ref.current);
			}

			updateSize();

			return () => {
				if (ref.current) {
					resizeObserver.unobserve(ref.current);
				}
			};
		} else {
			window.addEventListener("resize", updateSize);
			updateSize();

			return () => {
				window.removeEventListener("resize", updateSize);
			};
		}
	}, [ref]);

	return [ref, size];
}

export default useComponentSize;
