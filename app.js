console.log("hello")

const { MultiFormatReader, BarcodeFormat } = require('@zxing/library/esm5'); // use this path since v0.5.1

const hints = new Map();
const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.DATA_MATRIX/*, ...*/];

hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

const reader = new MultiFormatReader();

reader.setHints(hints);

const luminanceSource = new RGBLuminanceSource(imgWidth, imgHeight, imgByteArray);
const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));

reader.decode(binaryBitmap);

src="https://unpkg.com/@zxing/library@latest"

window.addEventListener("load", function () {
  let selectedDeviceId;
  const codeReader = new ZXing.BrowserMultiFormatReader();
  console.log("ZXing code reader initialized");
  codeReader
    .getVideoInputDevices()
    .then((videoInputDevices) => {
      const sourceSelect = document.getElementById("sourceSelect");
      selectedDeviceId = videoInputDevices[0].deviceId;
      if (videoInputDevices.length >= 1) {
        videoInputDevices.forEach((element) => {
          const sourceOption = document.createElement("option");
          sourceOption.text = element.label;
          sourceOption.value = element.deviceId;
          sourceSelect.appendChild(sourceOption);
        });

        sourceSelect.onchange = () => {
          selectedDeviceId = sourceSelect.value;
        };

        const sourceSelectPanel = document.getElementById(
          "sourceSelectPanel"
        );
        sourceSelectPanel.style.display = "block";
      }

      document
        .getElementById("startButton")
        .addEventListener("click", () => {
          codeReader.decodeFromVideoDevice(
            selectedDeviceId,
            "video",
            (result, err) => {
              if (result) {
                console.log(result);
                document.getElementById("result").textContent =
                  result.text;
              }
              if (err && !(err instanceof ZXing.NotFoundException)) {
                console.error(err);
                document.getElementById("result").textContent = err;
              }
            }
          );
          console.log(
            `Started continous decode from camera with id ${selectedDeviceId}`
          );
        });

      document
        .getElementById("resetButton")
        .addEventListener("click", () => {
          codeReader.reset();
          document.getElementById("result").textContent = "";
          console.log("Reset.");
        });
    })
    .catch((err) => {
      console.error(err);
    });
});