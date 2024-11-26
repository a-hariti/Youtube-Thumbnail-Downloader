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
      const downloadLink = document.getElementById('download-link');
      const errorMessage = document.getElementById('error-message');

      // Get the video title from the tab
      const videoTitle = currentTab.title.replace(' - YouTube', '').trim();
      // Clean the title to make it filesystem-friendly
      const cleanTitle = videoTitle.replace(/[\\/:*?"<>|]/g, '-');
      
      // Load the thumbnail
      thumbnailImg.onload = function() {
        thumbnailImg.style.display = 'block';
        downloadLink.style.display = 'inline-block';
        errorMessage.style.display = 'none';
      };
      
      thumbnailImg.onerror = function() {
        // If maxresdefault fails, try hqdefault
        thumbnailImg.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      };
      
      thumbnailImg.src = thumbnailUrl;
      
      // Set up download link
      downloadLink.addEventListener('click', function() {
        chrome.downloads.download({
          url: thumbnailImg.src,
          filename: `thumbnail-${cleanTitle}.jpg`,
          saveAs: true
        });
      });
    } else {
      // Show error message if not on a YouTube video page
      document.getElementById('error-message').style.display = 'block';
    }
  });
});
