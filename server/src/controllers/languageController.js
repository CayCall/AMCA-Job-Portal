import axios from 'axios';

export const switchLanguage = async (req, res) => {
  const { text } = req.body;
  const { target } = req.params;
  if (!text) return res.status(400).json({ error: 'text required' });

  try {
    const r = await axios.post('https://libretranslate.de/translate', {
      q: text, source: 'auto', target, format: 'text'
    });
    return res.json({ ok: true, translatedText: r.data.translatedText });
  } catch (e) {
    return res.status(502).json({ error: 'translation failed' });
  }
};
