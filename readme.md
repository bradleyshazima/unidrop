# Unidrop 🚀

**Your Universal Media Downloader.**

![Unidrop Demo Placeholder](https://res.cloudinary.com/bradley-cdn/image/upload/v1752342016/screenshot_vqhodm.png)
_Replace this placeholder with an actual screenshot or GIF of your application in action!_

## 🌟 About Unidrop

Unidrop is a modern, user-friendly web application designed to simplify the process of downloading videos from various online platforms. Leveraging the power of `yt-dlp` and a robust Node.js backend, Unidrop allows users to fetch video information, select their preferred quality, and download content directly to their device.

Whether you're looking to save educational content, short clips, or personal archives, Unidrop provides a seamless experience for obtaining media from the web.

## ✨ Features

* **Video Information Retrieval:** Quickly fetch titles, thumbnails, and available formats for a given video URL.
* **Quality Selection:** Choose from various video resolutions offered by the source.
* **Direct Download:** Download videos directly to your browser.
* **Clean & Intuitive UI:** A straightforward interface built with React and styled with Tailwind CSS.

## 🛠️ Tech Stack

Unidrop is built with a powerful and modern stack:

| Category      | Technology | Icon                                                                                                 |
| :------------ | :--------- | :--------------------------------------------------------------------------------------------------- |
| **Frontend** | React      | ![React](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg)                |
|               | JavaScript | ![JavaScript](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg) |
|               | Tailwind CSS | ![TailwindCSS](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg) |
| **Backend** | Node.js    | ![Node.js](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg)            |
|               | Express.js | ![Express.js](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg)       |
| **External** | yt-dlp     | ⬇️                                                                                                  |
| **(CLI Tool)**| FFmpeg     | 🎬                                                                                                  |

## 📦 Libraries & APIs Used

* **`express`**: Fast, unopinionated, minimalist web framework for Node.js.
* **`cors`**: Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
* **`child_process`**: Node.js module for spawning child processes, crucial for running `yt-dlp` and `ffmpeg`.
* **`fs`**: Node.js file system module, used for file operations and stream handling.
* **`path`**: Node.js module for working with file and directory paths.
* **`tmp`**: A robust and intuitive temporary file and directory creator for Node.js.
* **`yt-dlp`**: A command-line program to download videos from YouTube and other video sites (a fork of `youtube-dl`).
* **`FFmpeg`**: A complete, cross-platform solution to record, convert and stream audio and video. (Used in earlier iterations for merging, though current version focuses on direct streaming).

## ⚠️ Challenges Faced

During the development of Unidrop, a significant challenge arose with direct video streaming from the backend to the client. Specifically, for certain platforms like TikTok and Pinterest, attempting to pipe `yt-dlp`'s output directly to the browser's response stream often resulted in a `ERR_INVALID_RESPONSE` or `Client disconnected` error on the client side.

Even though `yt-dlp` was successfully extracting the video, the immediate byte stream was not always in a format or delivered at a speed that browsers expected for live playback/download. This led to the client prematurely closing the connection.

To address this, the current implementation (as of this commit) re-introduces a robust buffering mechanism:
1.  The selected video format is **first downloaded completely to a temporary file** on the server.
2.  Once the temporary file is fully downloaded and validated, a **read stream is created from this local file and then piped to the client**.

This approach ensures that the client receives a complete and well-formed video stream from the very beginning, significantly improving download reliability across diverse video sources.

## 🚀 Getting Started

To run Unidrop locally, follow these steps:

### Prerequisites

* Node.js (LTS version recommended)
* npm (comes with Node.js)
* `yt-dlp`: [Download from GitHub](https://github.com/yt-dlp/yt-dlp/releases) and ensure its path is correctly configured in `index.js`.
* `ffmpeg` (optional, if you re-introduce merging logic): [Download from ffmpeg.org](https://ffmpeg.org/download.html) and ensure it's in your system's PATH or its path is configured in `index.js`.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/bradleyshazima/unidrop.git](https://github.com/bradleyshazima/unidrop.git)
    cd unidrop
    ```

2.  **Backend Setup (`server` directory):**
    ```bash
    cd server
    npm install
    ```
    * **Configure `YT_DLP_PATH`**: Open `index.js` and set the `YT_DLP_PATH` variable to the full path of your `yt-dlp.exe` (or `yt-dlp` if on Linux/macOS).
        ```javascript
        const YT_DLP_PATH = "C:/Users/brady/AppData/Local/Programs/Python/Python313/Scripts/yt-dlp.exe"; 
        ```
    * Start the backend server:
        ```bash
        node index.js
        ```
        The server should start on `http://localhost:5000`.

3.  **Frontend Setup (if separate `client` directory, adjust path if not):**
    ```bash
    cd ../client # Adjust if your frontend is in a different directory
    npm install
    npm start
    ```
    This will start the React development server, usually on `http://localhost:3000`.

Open your browser and navigate to the frontend URL (e.g., `http://localhost:3000`).

## 🤝 Contributing

Unidrop is an open-source project, and I'm actively looking for collaborators! If you're interested in contributing to a video downloading solution, here's how you can help:

* **Bug Reports:** Found an issue? Please open a detailed issue on GitHub.
* **Feature Requests:** Have a great idea for a new feature? Share it by opening a new issue.
* **Code Contributions:**
    * Fork the repository.
    * Create a new branch (`git checkout -b feature/YourFeatureName`).
    * Make your changes.
    * Commit your changes (`git commit -m 'feat: Add new feature'`).
    * Push to the branch (`git push origin feature/YourFeatureName`).
    * Open a Pull Request, describing your changes thoroughly.
* **Documentation:** Help improve this README or add more detailed setup/troubleshooting guides.

I'm particularly interested in collaborating on improving streaming reliability, optimizing performance, and expanding platform support.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact & Organization

**Project Name:** Unidrop
**Organization:** Underground Labs
**Creator:** Bradley Shazima

Feel free to reach out for questions, feedback, or collaboration opportunities!