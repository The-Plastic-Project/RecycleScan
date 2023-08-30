import * as tf from "@tensorflow/tfjs"
import labels from "../model/labels.json";
import { openWebcam } from './webcam';

const videoRef = document.getElementById("frame");

export async function loadModel() {
  if (sessionStorage.getItem("model") === null) {
    tf.loadGraphModel("../model/model.json", {}).then(async (yolov7) => {
      // warmup
      const dummyInput = tf.ones(yolov7.inputs[0].shape);
      await yolov7.executeAsync(dummyInput).then((warmupResult) => {
        tf.dispose(warmupResult);
        tf.dispose(dummyInput);
      });
      sessionStorage.setItem("model", yolov7);
    });
  }
}

export async function loadWebCam() {
  // first, grab the model
  let model = sessionStorage.getItem("model");
  console.log("hello")
  if (model === null) {
    loadModel();
    model = sessionStorage.getItem("model");
  }
  console.log("model acquired")
  // now open the webcam
  openWebcam(videoRef, () => detectFrame(model));
}

// async function loadImage(path) {
//   const response = await fetch(path);
//   const blob = await response.blob();
//   const imageBitmap = await createImageBitmap(blob);
//   return imageBitmap;
// }

// async function imageToTensor(imageBitmap) {
//   const tensor = tf.browser.fromPixels(imageBitmap);
//   const resizedTensor = tf.image.resizeBilinear(tensor, [640, 640]);
//   const channelsLastTensor = resizedTensor.transpose([2, 1, 0]); // Swap dimensions 1 and 2
//   const normalizedTensor = channelsLastTensor.toFloat().div(tf.scalar(255));
//   const batchedTensor = normalizedTensor.expandDims(0);
//   return batchedTensor;
// }

async function detectFrame(model) {
    const model_dim = [640, 640];
    tf.engine().startScope();
    const input = tf.tidy(() => {
      const img = tf.image
                  .resizeBilinear(tf.browser.fromPixels(videoRef.current), model_dim)
                  .div(255.0)
                  .transpose([2, 1, 0])
                  .expandDims(0);
      return img
    });

    await model.executeAsync(input).then((res) => {
        res = res.arraySync()[0];
        processResults(res)
        // var detections = non_max_suppression(res);
        // const boxes =  shortenedCol(detections, [0,1,2,3]);
        // const scores = shortenedCol(detections, [4]);
        // const class_detect = shortenedCol(detections, [5]);

        // renderBoxes(canvasRef, threshold, boxes, scores, class_detect);
        // tf.dispose(res);
    });

    requestAnimationFrame(() => detectFrame(model)); // get another frame
    tf.engine().endScope();
};

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

    if (scores_data.length === 0) {
        console.log("no objects detected");
    }

    for (let i = 0; i < scores_data.length; ++i) {
      if (scores_data[i] > 0.5) {
        const cls = labels[classes_data[i]];
        const score = (scores_data[i] * 100).toFixed(1);
        console.log("detected: " + cls + " (" + score + ")")
      }
    }

    tf.dispose(res);
};