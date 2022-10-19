import { useState, useCallback, useEffect } from "react";

export function useMediaQuery(maxWidth) {
	const [targetReached, setTargetReached] = useState(false);

	const updateTarget = useCallback((e) => {
		if (e.matches) {
			setTargetReached(true);
		} else {
			setTargetReached(false);
		}
	}, []);

	useEffect(() => {
		const media = window.matchMedia(`(max-width: ${maxWidth}px)`);
		if (typeof(media.addEventListener) !== "function") {
			media.addListener(e => updateTarget(e));

			// Check on mount (callback is not called until a change occurs)
			if (media.matches) {
				setTargetReached(true);
			}

			return () => media.removeListener(e => updateTarget(e));
		}
        
		media.addEventListener("change", e => updateTarget(e));

		// Check on mount (callback is not called until a change occurs)
		if (media.matches) {
			setTargetReached(true);
		}

		return () => media.removeEventListener("change", e => updateTarget(e));
	}, []);

	return targetReached;
}