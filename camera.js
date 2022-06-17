let mediaStream = null;
// Prefer camera resolution nearest to 1280x720.
let constraints = {
  audio: false,
  video: {
    width: { ideal: 200 },
    height: { ideal: 400 },
    facingMode: "environment",
  },
};

async function getMediaStream(newConstraints = constraints) {
  try {
    let c = document.getElementById("cam");
    mediaStream = await navigator.mediaDevices.getUserMedia(newConstraints);
    let video = document.getElementById("cam");
    video.srcObject = mediaStream;
    video.onloadedmetadata = (event) => {
      video.play();
    };
  } catch (err) {
    console.error(err.message);
  }
}

async function switchCamera(cameraMode) {
  try {
    // stop current vide stream
    if (mediaStream != null && mediaStream.active) {
      let tracks = mediaStream.getVideoTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }

    // set the video source to null
    document.getElementById("cam").srcObject = null;

    // change "facingMode"
    constraints.video.facingMode = cameraMode;

    // get new media stream
    await getMediaStream(constraints);
  } catch (err) {
    console.error(err.message);
    alert(err.message);
  }
}

function takePicture() {
  let canvas = document.getElementById("canvas");
  let video = document.getElementById("cam");
  let photo = document.getElementById("photo");
  let context = canvas.getContext("2d");

  const height = video.videoHeight;
  const width = video.videoWidth;

  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  } else {
    clearphoto();
  }
}

async function takePhoto() {
  if (mediaStream == null) {
    await getMediaStream();
    // Just turn camera on
    return;
  }
  takePicture();
}

function clearPhoto() {
  console.log("clearPhoto");
  let canvas = document.getElementById("canvas");
  let photo = document.getElementById("photo");
  let context = canvas.getContext("2d");

  context.fillStyle = "transparent";
  context.fillRect(0, 0, canvas.width, canvas.height);
  var data = canvas.toDataURL("image/png");
  photo.removeAttribute("src");
}
