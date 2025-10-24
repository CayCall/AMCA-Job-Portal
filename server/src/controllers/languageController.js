import axios from "axios";
const ALLOWED = new Set(["en", "af", "zu", "st"]);


export const switchLanguage = async (req, res) => {
  const { target } = req.params || {};
  const { text, source = "en" } = req.body || {};

  if (!text?.trim()) return res.status(400).json({ error: "send body { text }" });
  if (!ALLOWED.has(target) || !ALLOWED.has(source)) {
    return res.status(400).json({ error: "source/target must be en|af|zu|st" });
  }

  try {
    const r = await axios.get("https://api.mymemory.translated.net/get", {
      params: { q: text, langpair: `${source}|${target}` },
      timeout: 10000
    });
    const out = r.data?.responseData?.translatedText;
    if (!out) return res.status(502).json({ error: "translation failed", raw: r.data });
    return res.json({ ok: true, from: source, to: target, translatedText: out, engine: "mymemory" });
  } catch (e) {
    return res.status(502).json({ error: "translation failed" });
  }
};













