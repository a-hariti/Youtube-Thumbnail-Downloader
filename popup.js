document.addEventListener('DOMContentLoaded', function() {
  // Query the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    const url = currentTab.url;
    
    // Check if we're on a YouTube video page
    if (url && url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/)) {
      const videoId = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/)[1];
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      
      const thumbnailImg = document.getElementById('thumbnail');
      const errorMessage = document.getElementById('error-message');
      
      // Load the thumbnail
      thumbnailImg.onload = function() {
        thumbnailImg.style.display = 'block';
        errorMessage.style.display = 'none';
      };
      
      thumbnailImg.onerror = function() {
        // If maxresdefault fails, try hqdefault
        thumbnailImg.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      };
      
      thumbnailImg.src = thumbnailUrl;
    } else {
      // Show error message if not on a YouTube video page
      document.getElementById('error-message').style.display = 'block';
    }
  });
});
