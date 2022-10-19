
export function modifyStoryBlokImage(url, {width, height, smart, fit, filters})
{
	// https://www.storyblok.com/docs/image-service
	
	// https://a.storyblok.com/f/105007/427x640/216c62f59a/sorencolorsmall.jpg
	// https://img2.storyblok.com/fit-in/600x130/smart/f/105007/427x640/216c62f59a/sorencolorsmall.jpg
	const originalUrl = new URL(url);
	const originalPath = originalUrl.pathname;
	
	// ignore images that are not on storyblok & svgs
	if(originalUrl.hostname !== "a.storyblok.com") return originalUrl;
	if(originalPath.endsWith(".svg")) return originalUrl;
	
	let originalDimensions = GetOriginalDimensions(url);
	let resultUrl = "https://img2.storyblok.com";
	
	const widthSpecified = !!width;
	const heightSpecified = !!height;
	
	let newWidth = 0, newHeight = 0;
	const ratioSpecified = widthSpecified && heightSpecified ? width/height : undefined;

	if(!widthSpecified && !heightSpecified){
		newWidth = originalDimensions.width;
		newHeight = originalDimensions.height;
	}
	else{
		if(widthSpecified && width > originalDimensions.width){
			newWidth = originalDimensions.width;
			height = ratioSpecified ? Math.round(newWidth/ratioSpecified) : height;
		}
		if(widthSpecified && !(width > originalDimensions.width)){
			newWidth = width;
		}
		if(heightSpecified && height > originalDimensions.height){
			newHeight = originalDimensions.height;
			newWidth = ratioSpecified ? Math.round(newHeight*ratioSpecified) : newWidth;
		}
		if(heightSpecified && !(height > originalDimensions.height)){
			newHeight = height;
		}
	}
	
	if(fit){
		resultUrl += "/fit-in";
	}
	
	if(widthSpecified || heightSpecified){
		resultUrl += `/${newWidth}x${newHeight}`;
	}
	
	if(smart){
		resultUrl += "/smart";
	}
	if(filters){
		resultUrl += `/filters:${filters}`;
	}
	
	resultUrl += originalPath;
	return resultUrl;
}

export function GetOriginalDimensions(storyBlokUrl){
	let storyBlokPath = new URL(storyBlokUrl).pathname;
	let dimensionPart = storyBlokPath.split("/")[3];
	let subParts = dimensionPart.split("x");
	
	return {
		width: Number(subParts[0]),
		height: Number(subParts[1])
	};
}

// imageSizes is an array of objects {width: int, height: int, smart: bool, fit: bool, filters: string}
// breakpoints is an array of int
// a width is needed!
export function getResponsiveStoryBlokImageSet(url, alt, imageSizes, breakpoints, className) {
	let lastImageSize = imageSizes[imageSizes.length - 1];
	let src = modifyStoryBlokImage(url, {width: lastImageSize.width, height: lastImageSize.height, smart: lastImageSize.smart, fit: lastImageSize.fit, filters: lastImageSize.filters});
	
	let srcset = "";
	imageSizes.forEach((image, i) => {
		if (i !== 0) {srcset += ", ";}
		srcset += modifyStoryBlokImage(url, {width: image.width, height: image.height, smart: image.smart, fit: image.fit, filters: image.filters})+" "+image.width+"w";
	});
	
	let sizes = "";
	if (!breakpoints) {sizes = "(min-width: 850px) 50vw, 100vw";}
	else {
		sizes = imageSizes[0].width+"px" || "100vw";
	}
	breakpoints.forEach((bp, i) => {
		sizes = "(min-width: " + (bp || 0) + "px) " + (imageSizes[i+1].width+"px" || "100vw") + ", " + sizes;
	});
	
	return(
		<>
			<img className={[className, "lazyload"].join(" ")}
				sizes={sizes}
				data-srcset={srcset}
				data-src={src}
				src={modifyStoryBlokImage(url, {width: 32, height: 32})}
				alt={alt}
			/>
		</>
	);
}

export function getDefaultStoryBlokImageSet(url, alt, {largestImageWidth, largestImageHeigth, smart, fit, filters}, breakpoint, className) {
	let imageSizes = [
		{width: largestImageWidth*0.5, height: largestImageHeigth*0.5, smart: smart, fit: fit, filters: filters},
		{width: largestImageWidth, height: largestImageHeigth, smart: smart, fit: fit, filters: filters}
	];
	let breakpoints = [breakpoint];
	return getResponsiveStoryBlokImageSet(url, alt, imageSizes, breakpoints, className);
}