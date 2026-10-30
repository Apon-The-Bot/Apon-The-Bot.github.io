UPLOAD READY PACKAGE
====================

This folder contains:
- Portfolio static site at root (upload these files to your main domain)
- Video Downloader app source inside ./video-downloader (same-domain subpath target)

Important:
- The portfolio link now points to ./video-downloader/
- The Video Downloader/Converter is a Node.js + ffmpeg + yt-dlp app
- Pure static hosting will NOT run the downloader/converter backend

If your hosting supports Node.js:
1) Upload this full folder
2) In ./video-downloader run: npm install
3) Start app: node server.js
4) Reverse proxy /video-downloader to that Node app port

Notes:
- Heavy files were excluded: node_modules, .git, storage downloads/temp files
- Default subpath mount is /video-downloader (configurable via APP_SUBPATH env)
