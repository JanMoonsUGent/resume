

export default function GetColorCode(oldColorName) {
	switch (oldColorName) {
	case "Blue": return "blue";
	case "Purple": return "purple";
	case "Yellow": return "yellow";
	case "Red": return "red";
	case "Green": return "green";
	case "White": return "white";
	default: return "white";
	}
}

export function ConvertToButtonVariant(colorCodeName) {
	switch (colorCodeName) {
		case "Blue": return "blue";
		case "Purple": return "purple";
		case "Yellow": return "yellow";
		case "Red": return "red";
		case "Green": return "green";
		case "White": return "white";
		default: return "primary";
	}
}