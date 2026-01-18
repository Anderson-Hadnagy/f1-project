module.exports = function(eleventyConfig) {
  // This tells Eleventy to copy the admin folder to the output (_site)
  eleventyConfig.addPassthroughCopy("admin"); 
  
  // Optional: If you want to use images from your CMS
  eleventyConfig.addPassthroughCopy("src/assets/images");

  return {
    dir: {
      input: "src", // or wherever your source files live
      output: "_site"
    }
  };
};