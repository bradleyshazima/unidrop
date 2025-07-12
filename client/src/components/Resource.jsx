import React from 'react';

const Resource = ({ data }) => {
  const handleDownload = (videoFormatId, hasAudio) => {
    let downloadUrl = `http://localhost:5000/api/download?url=${encodeURIComponent(data.url)}&video_format_id=${videoFormatId}`;

    // IMPORTANT: Add the has_audio parameter
    downloadUrl += `&has_audio=${hasAudio}`; // <--- ADD THIS LINE

    if (!hasAudio && data.audioFormatId) {
      // If video format doesn't have audio (hasAudio is false), and we have a separate audio format ID
      downloadUrl += `&audio_format_id=${data.audioFormatId}`;
    }

    // Add the title for a better filename
    if (data.title) {
      downloadUrl += `&title=${encodeURIComponent(data.title)}`;
    }

    // Open the URL to start the download
    window.open(downloadUrl, '_blank');
  };

  return (
    <section className='w-full flex flex-col items-center gap-10 py-12 select-none'>
      <h4 className='text-darker dark:text-lighter font-semibold text-2xl max-w-[700px] text-wrap text-center'>
        {data.title}
      </h4>
      <div className='flex items-center justify-center h-fit w-fit gap-10'>
        <img
          src={data.thumbnail}
          alt="Video Thumbnail"
          className="w-[400px] h-[225px] rounded-2xl object-cover"
        />
        <div className='bg-mid min-w-[240px] h-[225px] flex flex-col items-center rounded-2xl overflow-y-auto'>
          <ul className='w-full'>
            {data.formats.length > 0 ? (
              data.formats.map((format, index) => (
                <li
                  key={index}
                  className='text-lighter border-light border-b-2 py-4 px-2 flex items-center gap-4 justify-between'
                >
                  <span>{format.resolution}</span>
                  <span>{format.filesize}</span>
                  <button
                    onClick={() => handleDownload(format.format_id, format.hasAudio)}
                    className='bg-darker text-lighter rounded-2xl text-[8px] py-2 px-4'
                  >
                    Download
                  </button>
                </li>
              ))
            ) : (
              <li className='text-lighter py-4 px-2 text-center'>No downloadable formats found.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Resource;