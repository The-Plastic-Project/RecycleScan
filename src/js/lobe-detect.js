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
    webcam.style.display = 'none';
    canvas.style.display = "block";
    canvas.style["z-index"] = 0;
    const ctx = canvas.getContext('2d');

    // Resize the canvas to fit the screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // get width of webcam such that it has the appropriate height
    const webcamWidth = (webcam.videoWidth * window.innerHeight) / webcam.videoHeight;
    ctx.drawImage(webcam, -(webcamWidth - window.innerWidth) / 2, 0, webcamWidth, canvas.height);
    document.getElementById("loading-circle").style.display = "block"

    // let [rawDetections, _] = currDetection;
    const pixels = tf.browser.fromPixels(canvas);
    const res = await model.predict(pixels)
    
    setTimeout(async () => {
      document.getElementById("loading-circle").style.display = "none"
      await loadLobePopup(res.predictions[0], account);
    }, 3000); 

  })
}


async function setupCamera() {
  const video = document.getElementById('webcam');
  const stream = await navigator.mediaDevices.getUserMedia({ 'video': true });
  video.srcObject = stream;
  return new Promise((resolve) => {
      video.onloadedmetadata = () => {
          resolve(video);
      };
  });
}


async function loadLobePopup(res, account) {
    let label = res.label;
    label = label.replace(/e-waste-.*/, "e-waste").toLowerCase();
    const score = res.confidence;
    if (score < 0.5) {
      document.getElementById("no-items-id").style.animation = "popup-box-ani 0.5s forwards"; 
    } else {
        const title = label.charAt(0).toUpperCase() + label.slice(1);
        document.getElementById("lobe-title").textContent = "Identified as: " + title;
        document.getElementById("lobe-description").textContent = recycleInfo[label].info;
        if (account) {
            document.getElementById("lobe-track").onclick = async function () {
                await addItems(user, [label]);
                document.getElementById("lobe-track-text").textContent = "Item tracked"
                document.getElementById("lobe-track").onclick = null;
            }
        }
      document.getElementById("lobe-popup").style.animation = "popup-box-ani 0.5s forwards"; 
    }
}