import Webcam from 'react-webcam';

function Video({width, height, videoRef, onPlay}) {
    return (
        <Webcam audio={true} mirrored={true} width={width} height={height} screenshotQuality={1} ref={videoRef} onPlay={onPlay} />
    );
}

export default Video;