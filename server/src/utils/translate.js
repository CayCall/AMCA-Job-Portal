export async function translateText(text, target, source = "en") {
  if (!text || target === source) return text;
  const res = await fetch(`/api/translate/${target}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, source })
  });
  const data = await res.json().catch(() => ({}));
  return data?.translatedText || text;
}