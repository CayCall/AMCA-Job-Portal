import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-4 rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-400 transition duration-300"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default BackToTop;
