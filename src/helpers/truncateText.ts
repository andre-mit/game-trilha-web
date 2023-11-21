export default function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}
