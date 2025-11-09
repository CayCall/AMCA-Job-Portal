import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const NoticePopup = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const [faded, setFaded] = useState(false);

  useEffect(() => {

    const fadeTimer = setTimeout(() => setFaded(true), 8000);
    return () => clearTimeout(fadeTimer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 opacity-70 bg-white/95 backdrop-blur-sm text-gray-700 border border-gray-300 shadow-lg rounded-md p-3 max-w-sm w-[90%] sm:w-[360px] z-50 text-sm flex items-start justify-between gap-3 transition-all duration-500 ${
        faded ? "opacity-70" : "opacity-100"
      }`}
    >
      <div>
        ⚠️{" "}
        {t(
          "Note: This demo runs on free-tier hosting and translation services."
        )}{" "}
        {t(
          "If pages loads slowly on first try or translations pause, please wait a few seconds before refreshing."
        )}{" "}
        {t(
          "For testing, limit refreshes to 10 max per session."
        )}
      </div>
      <button
        onClick={() => setVisible(false)}
        className="ml-2 text-gray-500 hover:text-gray-700 font-bold"
      >
        ✕
      </button>
    </div>
  );
};

export default NoticePopup;
