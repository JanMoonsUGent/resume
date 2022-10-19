export default function Pluralize({count, name}){
	if(Number(count) === 1){
		return `${count} ${name}`;    
	}
	return `${count} ${name}s`;
}