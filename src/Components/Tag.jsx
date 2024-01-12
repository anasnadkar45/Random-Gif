import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import GridLoader from 'react-spinners/GridLoader';

function Tag() {
    const ApiKey = "i8hCdB5qahn11QtX0aSRMzdK21TC6SqC";

    const [gif, setGif] = useState('');
    const [loading, setLoading] = useState(false);
    const [tag, setTag] = useState('car');
    const [url, setUrl] = useState('');
    const [copyButtonText, setCopyButtonText] = useState('Copy'); // Added state for button text

    const urlInputRef = useRef(null);

    const fetchData = async () => {
        setLoading(true);
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${ApiKey}&tag=${tag}`;
        try {
            const { data } = await axios.get(url);
            const imageSource = data.data.images.downsized_large.url;
            setGif(imageSource);
            setUrl(data.data.images.downsized_large.url);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    function generateHandler() {
        fetchData();
    }

    function copyToClipboard() {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url);
            setCopyButtonText('Copied'); // Update button text when URL is copied
        } else {
            urlInputRef.current.select();
            document.execCommand('copy');
            setCopyButtonText('Copied'); // Update button text when URL is copied
        }
    }

    async function convertAndDownload() {
        try {
            setLoading(true);

            // Construct the URL for ezgif with the GIF link pre-filled
            const ezgifUrl = `https://ezgif.com/gif-to-mp4?url=${encodeURIComponent(url)}`;

            // Open the ezgif URL in a new tab or window
            window.open(ezgifUrl, '_blank');
        } catch (error) {
            console.error('Error converting and downloading:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-12/12 bg-yellow-500 rounded-lg border border-black flex justify-center items-center flex-col gap-y-5 mt-[15px] p-5'>
            <h1 className='text-xl'>A Random Gif</h1>
            {loading ? (<GridLoader color="#36d7b7" />) : (<img src={gif} alt="" className='rounded-md' />)}
            <input
                placeholder='enter a gif'
                className='text-center rounded-md p-3 text-xl focus:outline-none w-full'
                onChange={(event) => setTag(event.target.value)}
                value={tag}
            />
            <button onClick={generateHandler} className='focus:outline-none w-full'>Generate Gif</button>
            <div className='flex gap-2'>
                <div className="flex  items-center text-purple-600 border rounded-md">
                    <div className="px-3 py-2.5 rounded-l-md bg-white border">
                        URL
                    </div>
                    <input
                        type="text"
                        placeholder="www.example.com"
                        id="website-url"
                        value={url}
                        className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
                        ref={urlInputRef}
                    />
                </div>
                <button onClick={copyToClipboard} className='bg-white text-black focus:outline-none hover:border-none'>{copyButtonText}</button>
                <button onClick={convertAndDownload} className=''>Download</button>
            </div>
        </div>
    );
}

export default Tag;
