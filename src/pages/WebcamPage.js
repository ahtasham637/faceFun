import React, { useEffect, useRef, useState } from "react";
import Video from "../components/Video";
import {nets as faceNets, TinyFaceDetectorOptions, detectSingleFace} from 'face-api.js';


function WebcamPage() {
    const [userData, setUserData] = useState({
        name: '',
        age: '',
        gender: '',
        expression: ''
    });
    

    const [dimensions, setDimensions] = useState({});
    const [isLoadWebcam, setIsLoadWebcam] = useState(false);

    const videoRef = useRef(null);

    useEffect(() => {
        const {width, height} = getWindowDimensions();

        setDimensions({width, height});
    }, []);

    useEffect(() => {
        const userName = localStorage.getItem('name');
        const newUserData = {...userData, name: userName};

        setUserData(newUserData);
    }, []);

    useEffect(() => {
        const loadModels = async () => {
            await initFaceModels();
            setIsLoadWebcam(true);
        };

        loadModels();
    }, []);


    const getWindowDimensions = () =>
    {
        const {innerWidth: width, innerHeight: height} = window;

        return {
            width,
            height
        }
    }

    const initFaceModels = () =>
    {
        const modelsFolder = process.env.PUBLIC_URL + '/weights';
        console.log('i am being loded');
        return Promise.all([
            faceNets.tinyFaceDetector.loadFromUri(modelsFolder),
            faceNets.faceExpressionNet.loadFromUri(modelsFolder),
            faceNets.ageGenderNet.loadFromUri(modelsFolder)
        ]);
    }

    const onWebcamStart = () => {
        setInterval(detectFaces, 200);
    };

    const detectFaces = async () => {
        const currentVideo = videoRef.current.video;

        const detection = await detectSingleFace(currentVideo, new TinyFaceDetectorOptions())
            .withAgeAndGender()
            .withFaceExpressions();


        if(typeof detection !== 'undefined' && detection !== null && detection)
        {
            const {age, expressions, gender} = detection;
            
            const roundedAge = Math.round(age);

            const expression = getExpression(expressions);

            const newUserData = {...userData, age: roundedAge, gender, expression};

            setUserData(newUserData);
        }
    };

    const getExpression = (expressions) => {
        const sortedExpression = expressions.asSortedArray();

        return sortedExpression[0].expression;
    }

    const loadWebcam = ({width, height}) => {
        return (
            <Video width={width} height={height} videoRef={videoRef} onPlay={onWebcamStart} />
        );
    }

    const getAvatarImage = ({gender}) => {
        
        let imgSelect = "/male.png";
        if(gender.toLowerCase() === "female")
        {
            imgSelect = "/female.png";
        }

        return (
            <img className="block h-24 rounded-full mx-0 flex-shrink-0 border-2 border-pink-300" src={process.env.PUBLIC_URL + imgSelect} alt="Face" />
        );
    };

    const showUserInfo = ({name, gender = "Male", age = "60", expression = "Happy"}) => 
    {
        return (
            <div className="mt-8 py-4 px-8 max-w-sm sm:max-w-md mx-auto bg-white rounded-md shadow-2xl flex items-center space-y-0 space-x-6">
                {getAvatarImage({gender})}
                <div className="space-y-2 text-left">
                    <div className="space-y-0.5">
                    <p className="text-lg text-gray-800 font-semibold">
                        {name}
                    </p>
                    <p className="text-blue-500 font-medium">
                        <span>Gender:</span> <span className="capitalize font-bold">{gender}</span>
                    </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="mr-2 whitespace-nowrap px-4 py-1 text-sm text-blue-600 font-semibold rounded-full border border-blue-500">Age: <span className="font-bold">{age}</span></div>
                        <div className="mr-2 whitespace-nowrap px-4 py-1 text-sm text-pink-600 font-semibold rounded-full border border-pink-500">Look: <span className="font-bold capitalize">{expression}</span></div>
                    </div>
                    
                </div>
            </div>
        );
    }

    return (
        <div className="text-blue-50">
            {isLoadWebcam && loadWebcam({width: dimensions.width, height: dimensions.height})}
            <div>
                {showUserInfo({name: userData.name, gender: userData.gender, expression: userData.expression, age: userData.age})}
            </div>
        </div>
    );
}

export default React.memo(WebcamPage);