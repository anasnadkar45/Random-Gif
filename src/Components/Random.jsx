import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GridLoader from 'react-spinners/GridLoader'
function Random() {
    const ApiKey = "i8hCdB5qahn11QtX0aSRMzdK21TC6SqC"

    const [gif, setGif] = useState('');
    const [loading , setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${ApiKey}`;
        const { data } = await axios.get(url);
        const imageSource = data.data.images.downsized_large.url;
        setGif(imageSource)
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    function generateHandler() {
        fetchData();
    }

    return (
        <div className='w-12/12 bg-purple-500 rounded-lg border border-black flex justify-center items-center
    flex-col gap-y-5 mt-[15px] p-5'>
            <h1 className='text-xl'>A Random Gif</h1>
            {
                loading ? (<GridLoader color="#36d7b7" />):(<img src={gif} alt="" className='rounded-md' />)
            }
            <button onClick={generateHandler} className='focus:outline-none w-full'>Generate Gif</button>
            {/* <label for="website-url" className="block py-2 text-white">
                Website URL
            </label>
            <div className="flex items-center text-purple-600 border rounded-md">
                <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                    https://
                </div>
                <input
                    type="text"
                    placeholder="www.example.com"
                    id="website-url"
                    className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
                />
                <button>copy</button>
            </div> */}
        </div>
    )
}

export default Random