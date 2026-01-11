eleventyConfig.addPassthroughCopy("src/admin");

module.exports = function(eleventyConfig) {
  // Pass through CSS and JS to the output folder
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};