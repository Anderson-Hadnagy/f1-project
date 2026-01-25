module.exports = function(eleventyConfig) {
  
  // 1. Copy the admin and images folders to the final site
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/assets/images");

  // 2. Create the 'blog' collection
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md");
  });

  // 3. UPDATED: Custom Date Filter (YYYY/MM/DD Day HH:MM)
  eleventyConfig.addFilter("date", (dateObj) => {
    if (!dateObj) return "";
    const date = new Date(dateObj);
    
    // Get the date parts
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-11, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    
    // Get the day name (Sun, Mon, etc.)
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = dayNames[date.getDay()];
    
    // Get the time (HH:MM)
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Return the final formatted string
    return `${year}/${month}/${day} ${dayName} ${hours}:${minutes}`;
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};