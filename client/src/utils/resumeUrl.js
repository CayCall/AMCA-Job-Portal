const resumeInlineUrl = (url) =>
    url && url.includes("/upload/")
        ? url.replace("/upload/", "/upload/fl_inline/")
        : url;

export default resumeInlineUrl;