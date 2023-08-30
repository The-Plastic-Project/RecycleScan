export function openWebcam(videoRef, onLoaded) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: {
            facingMode: "environment",
            },
        })
        .then((stream) => {
            window.localStream = stream;
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              onLoaded();
            };
        });
    } else alert("Can't open Webcam!");
};

export function closeWebcam(videoRef) {
    if (videoRef.current.srcObject) {
        videoRef.current.srcObject = null;
        window.localStream.getTracks().forEach((track) => {
        track.stop();
        });
    } else alert("Please open Webcam first!");
};
