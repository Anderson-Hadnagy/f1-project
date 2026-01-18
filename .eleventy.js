module.exports = function(eleventyConfig) {
  // This tells 11ty: "Take the whole admin folder and move it to the build"
  eleventyConfig.addPassthroughCopy("src/admin");
  
  // Also ensure your assets/images folder is copied so the CMS can save photos
  eleventyConfig.addPassthroughCopy("src/assets/images");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};