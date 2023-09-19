import * as tf from "@tensorflow/tfjs"
import recycleInfo from "../model/recycle-info.json";
import { checkAuth } from './auth';
import { addItems } from './track';
import { LobeModel } from './lobe-model';

var current_up;
var user;

// lobe version
export async function loadLobe(account) {

  if (account) {
    user = await checkAuth();
  }

  const canvas = document.getElementById('canvas');
  const captureButton = document.getElementById('captureButton');
  const mat_id = document.getElementById("mat-id");
  current_up = mat_id;
  
  const webcam = await setupCamera()

  canvas.style.display = "block";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const model = new LobeModel()
  await model.load()

  // Set up capture button click event
  captureButton.addEventListener('click', async function (){
    console.log("onclick");

    webcam.style.display = 'none';
    canvas.style.display = "block";
    canvas.style["z-index"] = 0;
    const ctx = canvas.getContext('2d');

    // get width of webcam such that it has the appropriate height
    const webcamWidth = (webcam.videoWidth * window.innerHeight) / webcam.videoHeight;
    ctx.drawImage(webcam, -(webcamWidth - window.innerWidth) / 2, 0, webcamWidth, canvas.height);

    await loadLobePopup(model, canvas, account);
  })
}

async function setupCamera() {
  const videoRef = document.getElementById('webcam');
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
        videoRef.srcObject = stream;
      });
  } else alert("Can't open Webcam!");

  return videoRef;
}


async function loadLobePopup(model, canvas, account) {
    let score;
    let label;

    const pixels = tf.browser.fromPixels(canvas);
    let res = await model.predict(pixels);

    res = res.predictions[0]

    console.log(res)

    label = res.label;
    label = label.replace(/e-waste-.*/, "e-waste").toLowerCase();
    score = res.confidence;

    setTimeout(async () => {
      document.getElementById("lobe-loader").style.display = "none";
      document.getElementById("lobe-content").style.display = "block";
    }, 1500); 



    if (score < 0.1) {
      document.getElementById("no-items-id").style.animation = "popup-box-ani 0.5s forwards"; 
    } else {
        const title = label.charAt(0).toUpperCase() + label.slice(1);
        document.getElementById("lobe-title").textContent = "Identified as: " + title;
        document.getElementById("lobe-description").textContent = recycleInfo[label].info;
        if (account) {
            document.getElementById("lobe-track").onclick = async function () {
                document.getElementById("loader").style.display = "block";
                document.getElementById("lobe-track-text").style.display = "none";
                setTimeout(async () => {
                  await addItems(user, [label]);
                  document.getElementById("loader").style.display = "none";
                  document.getElementById("lobe-track-text").style.display = "block";
                  document.getElementById("lobe-track-text").textContent = "Item Tracked";
                  document.getElementById("lobe-track").onclick = null;
                }, 500); 
            }
        }
      document.getElementById("lobe-popup").style.animation = "popup-box-ani 0.5s forwards"; 
    }
}