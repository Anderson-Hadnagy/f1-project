module.exports = function(eleventyConfig) {
  // This is the most important line for the CMS to work!
  eleventyConfig.addPassthroughCopy("src/admin");
  
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};