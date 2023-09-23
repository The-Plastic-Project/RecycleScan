import * as tf from "@tensorflow/tfjs"
import { Analytics } from "aws-amplify";
import recycleInfo from "../model/recycle-info.json";
import { checkAuth } from './auth';
import { addItems } from './track';
import { LobeModel } from './lobe-model';

var user;

// load the lobe model (classification model) and set up the HTML
// account is a int (0 or 1) saying whether the user is signed in or not
// this exists since the model is usable with and without an account, and
// the model needs to work differently in each case
export async function loadLobe(account) {

  // scan page isn't accessible without account
  if (account) {
    user = await checkAuth();
  }

  // this can be time consuming - TODO: shorten
  const model = new LobeModel()
  await model.load()

  const webcam = await setupCamera()

  canvas.style.display = "block";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // set up click event for button that starts the classification
  document.getElementById('captureButton').addEventListener('click', async function (){

    // hide the webcam and display the lastest frame as a static image
    webcam.style.display = 'none';
    canvas.style.display = "block";
    canvas.style["z-index"] = 0;
    const ctx = canvas.getContext('2d');
    const webcamWidth = (webcam.videoWidth * window.innerHeight) / webcam.videoHeight;
    ctx.drawImage(webcam, -(webcamWidth - window.innerWidth) / 2, 0, webcamWidth, canvas.height);

    // return a scan event
    Analytics.record( {name: 'scanWaste'} );

    // finally, actually load the classification
    await loadLobePopup(model, canvas, account);
  })

  // make the loaders disappear
  document.getElementById('loading-circle').style.display = "none";
  document.getElementById('loading-text').style.display = "none";
}

// requests the user's webcam and sends an alert if it cant be accessed
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

// load the popup box with the classification
async function loadLobePopup(model, canvas, account) {

  // start off by getting all the HTML elements we need
  const lobePopup = document.getElementById("lobe-popup");
  const lobeLoader = document.getElementById("lobe-loader");
  const lobeContent = document.getElementById("lobe-content");
  const lobeTrack =  document.getElementById("lobe-track");
  const lobeTrackText = document.getElementById("lobe-track-text");
  const loader = document.getElementById("loader")

  // only display the info when the box display animation is over
  lobePopup.addEventListener('animationend', async function(event) {
    if (event.animationName === "popup-box-ani") {
      
      // grab prediction from model and process
      let score;
      let label;
      const pixels = tf.browser.fromPixels(canvas);
      let res = await model.predict(pixels);
      res = res.predictions[0]
      label = res.label;
      label = label.replace(/e-waste-.*/, "e-waste").toLowerCase();
      score = res.confidence;

      // arbitrary confidence bound 
      if (score < 0.8) {
        document.getElementById("no-items-id").style.animation = "popup-box-ani 0.5s forwards"; 
      } else {
          const title = label.charAt(0).toUpperCase() + label.slice(1);
          document.getElementById("lobe-title").textContent = "Identified as: " + title;
          console.log(label);
          document.getElementById("lobe-description").textContent = recycleInfo[label].info;
          if (account) { // only add track functionality if user is loggin in
            lobeTrack.onclick = async function () {
              loader.style.display = "block";
                lobeTrackText.style.display = "none";
                setTimeout(async () => {
                  await addItems(user, [label]);
                  loader.style.display = "none";
                  lobeTrackText.style.display = "block";
                  lobeTrackText.textContent = "Item Tracked";
                  lobeTrack.onclick = null;
                }, 500); 
              }
          }
      }
      // 1000ms buffer before showing content to make it look better
      setTimeout(async () => {
        lobeLoader.style.display = "none";
        lobeContent.style.display = "block";
      }, 1000); 
    }
  });

  // Start the animation
  lobePopup.style.animation = "popup-box-ani 0.5s forwards";
}