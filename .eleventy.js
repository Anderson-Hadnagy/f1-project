module.exports = function(eleventyConfig) {
  // If your admin folder is at the root:
  eleventyConfig.addPassthroughCopy("admin");

  // OR if your admin folder is inside a 'src' folder:
  // eleventyConfig.addPassthroughCopy("src/admin");

  return {
    dir: {
      input: "src", // check if your input is "src" or root "."
      output: "_site"
    }
  };
};