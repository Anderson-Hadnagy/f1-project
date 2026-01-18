module.exports = function(eleventyConfig) {
  // This tells Eleventy to copy the admin folder as-is
  eleventyConfig.addPassthroughCopy("admin"); 
  
  // If your files are inside a 'src' folder, use this instead:
  // eleventyConfig.addPassthroughCopy("src/admin");

  return {
    dir: {
      input: "src", // check if your input folder is 'src' or root
      output: "_site"
    }
  };
};