import * as tf from "@tensorflow/tfjs"
import labels from "../model/yolov5/labels.json";
import recycleInfo from "../model/recycle-info.json";
import { checkAuth } from './auth';
import { addItems } from './track';
import { LobeModel } from './lobe-model';

var current_up;
var trackedItems;
var user;


export async function loadYolo(account) {

  if (account) {
    user = await checkAuth();
  }

  console.log(user);

  const canvas = document.getElementById('canvas');
  const captureButton = document.getElementById('captureButton');
  const mat_id = document.getElementById("mat-id");
  current_up = mat_id;
  trackedItems = [];
  
  const webcam = await setupCamera()

  canvas.style.display = "block";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  tf.loadGraphModel(`../model/yolov5/model.json`).then(async (model) => { 

    // Set up capture button click event
    captureButton.addEventListener('click', async function () {
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
      const rawDetections = await getResult(tf.browser.fromPixels(canvas), model);
      let [detectionsDict, detections] = processDetections(rawDetections);
      console.log(detections);
      
      setTimeout(async () => {
        document.getElementById("loading-circle").style.display = "none"
        await loadPopups(detectionsDict, detections, -1, account);
      }, 3000); 

    });

    // detectFrame(model, webcam, ctx)
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

// async function detectFrame(model, webcam, ctx) {
//   if (!stopDetection) {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
//     const rawTensor = tf.browser.fromPixels(webcam);
//     const tensor = await cropTensor(rawTensor);
//     const [detections, boxes] = await getResult(tensor, model);
//     currDetection = [detections, boxes];
//     for (let i = 0; i < detections.length; i ++) {
//       // let [y1, x1, y2, x2] = xywh2xyxy(boxes[i]);
//       // // Calculate scaling factors for both X and Y axes
//       // // const scaleX = ctx.canvas.width / webcam.videoWidth;
//       // // const scaleY = ctx.canvas.height / webcam.videoHeight;
//       // const scaleX = ctx.canvas.width / 640;
//       // const scaleY = ctx.canvas.height / 640;
//       // // Scale the coordinates to fit the canvas
//       // x1 *= scaleX;
//       // x2 *= scaleX;
//       // y1 *= scaleY;
//       // y2 *= scaleY;
//       // const width = x2 - x1;
//       // const height = y2 - y1;
//       // ctx.strokeStyle = "#74B9BA";
//       // ctx.lineWidth = 4;
//       // ctx.strokeRect(x1, y1, width, height);

//       let [y, x, h, w] = boxes[i];
//       const scaleX = ctx.canvas.width / 640;
//       const scaleY = ctx.canvas.height / 640;
//       x = x * scaleX - 200;
//       y = y * scaleY;
//       w *= scaleX;
//       h *= scaleY;
//       ctx.strokeStyle = "#74B9BA";
//       ctx.lineWidth = 4;
//       ctx.strokeRect(x, y, w, h);
//     }
//     requestAnimationFrame(() => detectFrame(model, webcam, ctx)); // get another frame
//   }
// }


// async function cropTensor(inputTensor) {
//   console.log(inputTensor);

//   const targetShape = [window.innerWidth, window.innerHeight];

//   // Get the dimensions of the input tensor
//   const inputHeight = inputTensor.shape[0];
//   const inputWidth = inputTensor.shape[1];

//   // Calculate the aspect ratio of the input tensor
//   const inputAspectRatio = inputWidth / inputHeight;

//   // Calculate the aspect ratio of the target shape
//   const targetAspectRatio = targetShape.width / targetShape.height;

//   let scaledTensor;

//   if (inputAspectRatio > targetAspectRatio) {
//       // If the input tensor is wider than the target shape, scale by width
//       const newWidth = targetShape[0];
//       const newHeight = targetShape[0] / inputAspectRatio;
//       scaledTensor = tf.image.resizeBilinear(inputTensor, [newHeight, newWidth]);
//   } else {
//       // If the input tensor is taller than or equal to the target shape, scale by height
//       const newWidth = targetShape[1] * inputAspectRatio;
//       const newHeight = targetShape[1];
//       console.log(inputTensor);
//       console.log([newHeight, newWidth]);
//       scaledTensor = tf.image.resizeBilinear(inputTensor, [newHeight, newWidth]);
//   }

//   // Calculate the crop dimensions to fit the target shape
//   const cropWidth = Math.min(scaledTensor.shape[1], targetShape.width);
//   const cropHeight = Math.min(scaledTensor.shape[0], targetShape.height);

//   // Calculate the starting point for cropping to center the region
//   const cropX = Math.floor((scaledTensor.shape[1] - cropWidth) / 2);
//   const cropY = Math.floor((scaledTensor.shape[0] - cropHeight) / 2);

//   // Crop the scaled tensor to fit the target shape
//   const croppedTensor = scaledTensor.slice([cropY, cropX, 0], [cropHeight, cropWidth, 3]);

//   return croppedTensor;
// }


function showPopup(next) {
  current_up.style.animation = "popup-box-ani-rev 0.5s";    
  next.style.animation = "popup-box-ani 0.5s forwards"; 
  current_up = next;
}


// create each popup and link to the next one, + display the first popup
// handles case with no detections
async function loadPopups(detectionsDict, detections, idx, account) {
  if (detections.length === 0) { // no items identified
    document.getElementById("no-items-id").style.animation = "popup-box-ani 0.5s forwards"; 
  } else if (idx === detections.length) { // finished
    showPopup(document.getElementById("finish"));


    if (account) {
      setTimeout(async () => {
        await addItems(user, trackedItems);
        document.getElementById("adding-loader").style.display = "none";
        document.getElementById("finish-message").style.display = "block";
      }, 500); 
    }

  } else if (idx === -1) { // just started 
    // document.getElementById("mat-id").style.animation = "popup-box-ani 0.5s forwards"; 
    showPopup(document.getElementById("mat-id")) ;
    document.getElementById("load-first").onclick = function () {
      loadPopups(detectionsDict, detections, 0, account)
    };
  } else { // create generic popup
    const item = detections[idx];
    const title = item.charAt(0).toUpperCase() + item.slice(1) + " (" + detectionsDict[item] + ")";
    document.getElementById("popup-name").textContent = title;
    document.getElementById("popup-description").textContent = recycleInfo[item].info;
    // document.getElementById("popup-img").src = recycleInfo[item].img;
    document.getElementById("load-next").onclick = function () {
      loadPopups(detectionsDict, detections, idx + 1, account)
    }
    document.getElementById("load-prev").onclick = function () {
      loadPopups(detectionsDict, detections, idx - 1, account)
    }
    console.log("finishd first part")
    if (account) {
      if (!trackedItems.includes(item)) {
        document.getElementById("popup-track").onclick = function () {
            for (let i = 0; i < detectionsDict[item]; i++) {
              trackedItems.push(item);
            }
            document.getElementById("popup-track-text").textContent = "Item tracked"
            document.getElementById("popup-track").onclick = null;
        }
      } else {
        document.getElementById("popup-track-text").textContent = "Item tracked"
        document.getElementById("popup-track").onclick = null;
      }
    }
    showPopup(document.getElementById("generic-popup"));
  }
}

function processDetections(arr) {
  const dictionary = {}; // Initialize an empty object
  const uniqueArray = []; // Initialize an empty array for unique items

  for (const item of arr) {
      if (dictionary[item]) {
          // If the key exists in the dictionary, increment the count
          dictionary[item]++;
      } else {
          // If the key does not exist, initialize it with a count of 1
          dictionary[item] = 1;
          uniqueArray.push(item); // Add to the unique items array
      }
  }
  return [ dictionary, uniqueArray ];
}

async function getResult(tensor, model) {
  const input = tf.tidy(() => tf.image.resizeBilinear(tensor, [640, 640]).div(255.0).transpose([2, 1, 0]).expandDims(0));
  const res = await model.execute(input);
  return processResults(res);
}


function shortenedCol(arrayofarray, indexlist) {
  return arrayofarray.map(function (array) {
      return indexlist.map(function (idx) {
          return array[idx];
      });
  });
}

function xywh2xyxy(x){
  //Convert boxes from [x, y, w, h] to [x1, y1, x2, y2] where xy1=top-left, xy2=bottom-right
  var y = [];
  y[0] = x[0] - x[2] / 2  //top left x
  y[1] = x[1] - x[3] / 2  //top left y
  y[2] = x[0] + x[2] / 2  //bottom right x
  y[3] = x[1] + x[3] / 2  //bottom right y
  return y;
}

export function non_max_suppression(res, conf_thresh=0.50, iou_thresh=0.2, max_det = 300){
  // Initialize an empty list to store the selected boxes
  const selected_detections = [];

  for (let i = 0; i < res.length; i++) {

      // Check if the box has sufficient score to be selected
      if (res[i][4] < conf_thresh) {
          continue;
          }

      var box = res[i].slice(0,4);
      const cls_detections = res[i].slice(5);
      var klass = cls_detections.reduce((imax, x, i, arr) => x > arr[imax] ? i : imax, 0);
      const score = res[i][klass + 5];

      let object = xywh2xyxy(box);
      let addBox = true;


      // Check for overlap with previously selected boxes
      for (let j = 0; j < selected_detections.length; j++) {
          let selectedBox = xywh2xyxy(selected_detections[j]);

          // Calculate the intersection and union of the two boxes
          let intersectionXmin = Math.max(object[0], selectedBox[0]);
          let intersectionYmin = Math.max(object[1], selectedBox[1]);
          let intersectionXmax = Math.min(object[2], selectedBox[2]);
          let intersectionYmax = Math.min(object[3], selectedBox[3]);
          let intersectionWidth = Math.max(0, intersectionXmax - intersectionXmin);
          let intersectionHeight = Math.max(0, intersectionYmax - intersectionYmin);
          let intersectionArea = intersectionWidth * intersectionHeight;
          let boxArea = (object[2] - object[0]) * (object[3] - object[1]);
          let selectedBoxArea = (selectedBox[2] - selectedBox[0]) * (selectedBox[3] - selectedBox[1]);
          let unionArea = boxArea + selectedBoxArea - intersectionArea;

          // Calculate the IoU and check if the boxes overlap
          let iou = intersectionArea / unionArea;
          if (iou >= iou_thresh) {
              addBox = false;
              break;
      }
      }

      // Add the box to the selected boxes list if it passed the overlap check
      if (addBox) {
          const row =  box.concat(score, klass);
          selected_detections.push(row);
      }
  }

  return selected_detections
}

function processResults(res) {

    var detections = non_max_suppression(res.arraySync()[0]);
    const boxes =  shortenedCol(detections, [0,1,2,3]);
    const scores_data = shortenedCol(detections, [4]);
    const classes_data = shortenedCol(detections, [5]);

    const filteredDetections = [];
    const filteredBoxes = [];

    for (let i = 0; i < scores_data.length; ++i) {
      if (scores_data[i] > 0.1) {
        const cls = labels[classes_data[i]];
        filteredDetections.push(cls);
        filteredBoxes.push(boxes[i]);
      }
    }

    tf.dispose(res);

    return filteredDetections;
};

