module.exports = function(eleventyConfig) {
  
  // 1. Copy the admin and images folders to the final site
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/assets/images");

  // 2. Create the 'blog' collection
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md");
  });

  // 3. THIS IS THE MISSING FIX: The Date Filter
  eleventyConfig.addFilter("date", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toDateString();
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};