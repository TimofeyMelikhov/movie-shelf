
export function formatDate(dateString: string) {
	const parts = dateString.split("-");
	const day = parts[2];
  const month = parts[1];
  const year = parts[0];

	const monthNames = [
    "января", "февраля", "марта",
    "апреля", "мая", "июня",
    "июля", "августа", "сентября",
    "октября", "ноября", "декабря"
  ];
	return `${day} ${monthNames[parseInt(month) - 1]} ${year}`;
}

export function convertMinutesToHours(minutes: number) {
	let hours = Math.floor(minutes / 60);
	let mins = minutes % 60;
	return (hours < 10 ? "0" : "") + hours + ":" + (mins < 10 ? "0" : "") + mins;
}