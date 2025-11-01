import axios from "axios";

const URL = "https://translation.googleapis.com/language/translate/v2";
const KEY = process.env.GOOGLE_TRANSLATE_KEY;

export async function gTranslate(text, target, source = "en", format = "html") {
  if (!text?.trim() || source === target) return text;

  try {
    const response = await axios.post(
      `${URL}?key=${KEY}`,
      {
        q: text,
        source,
        target,
        format,
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      }
    );

    const translated = response.data?.data?.translations?.[0]?.translatedText;
    return translated || text;
  } catch (err) {
    console.error("Google Translate error:", err.response?.data || err.message);
    return text;
  }
}
