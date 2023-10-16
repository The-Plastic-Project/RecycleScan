import * as tf from '@tensorflow/tfjs';
import signature from "../model/lobe/signature.json";


// class for a LobeModel, written mostly by the lobe team at microsoft

export class LobeModel {
    modelPath;
    height;
    width;
    classes;
    model;

    constructor() {
        this.modelPath = `../model/lobe/model.json`;
        [this.width, this.height] = signature.inputs[Object.keys(signature.inputs)[0]].shape.slice(1,3);
        this.classes = signature.classes.Label;
    }

    // load model using TFJS
    // can be very lengthy on mobile: TODO make this faster
    async load() {
        const loadBar =  document.getElementById('model-load-bar');
        this.model = await tf.loadLayersModel(`../model/lobe/model.json`, {
            onProgress: (fractions) => {
              console.log((fractions * 100).toString() + "%");
              loadBar.style.width = (fractions * 100).toString() + "%"
            },
        });
    }

    // predict an image using the model
    // image is a TF tensor
    async predict(image) {
        if(!!this.model){
            const confidencesTensor = tf.tidy(() => {

            const [imgHeight, imgWidth] = image.shape.slice(0,2);
            // convert image to from 0 to 255 -> -1 to 1
            const normalizedImage = tf.div(image, tf.scalar(127.5));
            const shiftedImage = tf.sub(normalizedImage, tf.scalar(1))
            // make into a batch of 1 so it is shaped [1, height, width, 3]
            const reshapedImage = shiftedImage.reshape([1, ...shiftedImage.shape]);
            // center crop and resize
            let top = 0;
            let left = 0;
            let bottom = 1;
            let right = 1;
            if (imgHeight != imgWidth) {
                // the crops are normalized 0-1 percentage of the image dimension
                const size = Math.min(imgHeight, imgWidth);
                left = (imgWidth - size) / 2 / imgWidth;
                top = (imgHeight - size) / 2 / imgHeight;
                right = (imgWidth + size) / 2 / imgWidth;
                bottom = (imgHeight + size) / 2 / imgHeight;
            }
            const croppedImage = tf.image.cropAndResize(
            reshapedImage, [[top, left, bottom, right]], [0], [this.height, this.width]
            );
            if (this.model) {
                return this.model.predict(croppedImage);
            }
        })


        if (confidencesTensor) {
            const confidencesArray = await confidencesTensor.data();
            console.log(confidencesArray)
            confidencesTensor.dispose();
            const output = []
            for (let i=0; i < this.classes.length; i++) {
                output.push({label: this.classes[i], confidence: confidencesArray[i]})
            }
            output.sort((a,b) => {return a.confidence > b.confidence ? -1: 1})
        return {predictions: output};
        }
        } else {
            console.error("Model not loaded, please await this.load() first.");
        }
    }
}