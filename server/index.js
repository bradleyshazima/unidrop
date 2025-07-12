const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs'); // Still needed for potential error handling, though not for readStream in direct download
const path = require('path');
// const tmp = require('tmp'); // No longer needed as temporary files for merging are removed

const app = express();
const PORT = 5000;

// >>> IMPORTANT: Define the full paths here <<<
// Adjust these paths to where yt-dlp.exe is located on YOUR system.
// FFMPEG_PATH is no longer needed as merging logic is removed.
const YT_DLP_PATH = "C:/Users/brady/AppData/Local/Programs/Python/Python313/Scripts/yt-dlp.exe";
// const FFMPEG_PATH = "ffmpeg"; // Removed as merging logic is removed

app.use(cors());
app.use(express.json());

// Endpoint to get video information (thumbnail, title, available formats)
app.post('/api/get-video', (req, res) => {
    const { url } = req.body;
    console.log(`[GET-VIDEO] Received request for URL: ${url}`);

    if (!url) {
        console.warn('[GET-VIDEO] URL is missing in request body.');
        return res.status(400).json({ error: 'URL is required.' });
    }

    // Spawn yt-dlp to get video information as JSON
    const ytDlp = spawn(YT_DLP_PATH, [
        '--dump-json',
        '--no-warnings',
        '--print-json',
        '--format', 'bestvideo[ext=mp4]/best', // Simplified format string
        '--format-sort', 'height:1,fps:1,filesize:1',
        url
    ]);

    let data = '';
    let error = '';

    ytDlp.stdout.on('data', (chunk) => {
        data += chunk.toString();
    });

    ytDlp.stderr.on('data', (chunk) => {
        error += chunk.toString();
        console.error('[GET-VIDEO] yt-dlp stderr:', chunk.toString().trim());
    });

    ytDlp.on('close', (code) => {
        console.log(`[GET-VIDEO] yt-dlp process closed with code: ${code}`);
        if (code !== 0 || error) {
            console.error('[GET-VIDEO] yt-dlp error during info fetch:', error);
            return res.status(500).json({ error: 'Failed to fetch video info. Check server logs.' });
        }

        try {
            const json = JSON.parse(data);
            console.log('[GET-VIDEO] Successfully parsed yt-dlp JSON data.');

            // Filter and sort available formats
            const availableFormats = json.formats
                .filter(f => f.vcodec !== 'none' && f.height) // Only consider video formats with a height
                .sort((a, b) => (b.height || 0) - (a.height || 0) || (b.tbr || 0) - (a.tbr || 0));

            const videoFormats = [];
            const addedResolutions = new Set();

            for (const f of availableFormats) {
                const resolutionKey = `${f.height}p`;
                if (!addedResolutions.has(resolutionKey)) {
                    videoFormats.push({
                        resolution: resolutionKey,
                        format_id: f.format_id,
                        filesize: f.filesize ? (f.filesize / 1024 / 1024).toFixed(1) + ' MB' : 'Unknown',
                        hasAudio: f.acodec !== 'none' // Still indicate if it has audio, for frontend display if desired
                    });
                    addedResolutions.add(resolutionKey);
                }
            }

            const topVideoFormats = videoFormats.slice(0, 5); // Get top 5 unique video resolutions

            // audioFormatId is no longer relevant for backend logic, but can be sent as null
            // if the frontend expects it.
            res.json({
                title: json.title,
                thumbnail: json.thumbnail,
                formats: topVideoFormats,
                audioFormatId: null, // Always null as merging is removed
                url, // The original URL
            });
            console.log('[GET-VIDEO] Successfully sent video info to client.');
        } catch (e) {
            console.error('[GET-VIDEO] JSON parse error or data processing error:', e);
            res.status(500).json({ error: 'Failed to parse video data or process formats.' });
        }
    });

    ytDlp.on('error', (err) => {
        console.error('[GET-VIDEO] Failed to spawn yt-dlp process:', err.message);
        res.status(500).json({ error: `Failed to start video info process: ${err.message}. Check yt-dlp path.` });
    });
});

// Endpoint to download and stream the video
app.get('/api/download', async (req, res) => {
    // Extract parameters from query string
    const { url, video_format_id, title } = req.query; // has_audio and audio_format_id are no longer used for logic

    console.log(`[DOWNLOAD] Request received for URL: ${url}`);
    console.log(`[DOWNLOAD] video_format_id: ${video_format_id}`);
    console.log(`[DOWNLOAD] title: ${title}`);

    if (!url || !video_format_id) {
        console.error('[DOWNLOAD] Missing URL or video_format_id.');
        return res.status(400).send('Missing URL or video_format_id.');
    }

    // Sanitize title for filename to prevent path traversal or invalid characters
    const safeTitle = title ? title.replace(/[^a-z0-9_.-]/gi, '_') : 'video';
    const outputFileName = `${safeTitle}.mp4`;

    try {
        // Always attempt direct streaming, no merging logic
        console.log('Streaming directly from yt-dlp.');
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', `attachment; filename="${outputFileName}"`);

        console.log(`[DOWNLOAD] Spawning yt-dlp for direct stream of format ${video_format_id}`);
        // Use '-o -' to pipe the output of yt-dlp directly to stdout, then pipe stdout to response
        const ytDlpDirectStream = spawn(YT_DLP_PATH, ['-f', video_format_id, '-o', '-', url]);

        ytDlpDirectStream.stdout.pipe(res); // Pipe yt-dlp output directly to HTTP response stream

        ytDlpDirectStream.stderr.on('data', (chunk) => {
            console.error('[DOWNLOAD] yt-dlp direct stream stderr:', chunk.toString().trim());
            if (!res.headersSent) {
                res.status(500).send('Error streaming video directly from yt-dlp.');
            } else {
                res.end();
            }
            ytDlpDirectStream.kill();
        });

        ytDlpDirectStream.on('close', (code) => {
            console.log(`[DOWNLOAD] yt-dlp direct stream process closed with code: ${code}`);
            if (code !== 0 && !res.finished) {
                console.error('[DOWNLOAD] yt-dlp direct stream ended with non-zero code and response not finished.');
                res.end('Error streaming the video.');
            } else if (code === 0) {
                console.log('[DOWNLOAD] Direct stream completed successfully.');
                if (!res.finished) res.end();
            }
        });

        ytDlpDirectStream.on('error', (err) => {
            console.error(`[DOWNLOAD] Failed to spawn yt-dlp for direct stream: ${err.message}`);
            if (!res.headersSent) {
                res.status(500).send(`Failed to start direct stream: ${err.message}. Check yt-dlp path.`);
            } else {
                res.end();
            }
        });

        // Handle early client disconnect during direct stream
        req.on('close', () => {
            console.warn('[DOWNLOAD] Client disconnected during direct stream. Killing yt-dlp process.');
            ytDlpDirectStream.kill();
        });

    } catch (error) {
        console.error('[DOWNLOAD] Global catch block: Download process failed:', error.message);
        if (!res.headersSent) {
            res.status(500).send(`Error processing your request: ${error.message}`);
        } else {
            res.end();
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});