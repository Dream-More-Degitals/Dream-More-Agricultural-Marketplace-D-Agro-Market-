import { useState } from "react";
import {
  Stethoscope,
  Upload,
  Image as ImageIcon,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    setImage(file);
    setResult(null);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const analyzeImage = () => {
    if (!image) {
      alert("Please upload a crop image first.");
      return;
    }

    setLoading(true);

    // Demonstration AI analysis
    setTimeout(() => {
      setResult({
        disease: "Healthy / Possible Leaf Stress",
        confidence: 87,
        advice:
          "The image does not show strong signs of a severe disease. Monitor the crop regularly and check for changes in leaf color, spots or wilting.",
      });

      setLoading(false);
    }, 1500);
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-5xl">

        <Link
          to="/ai"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#E57036]"
        >
          <ArrowLeft size={17} />
          Back to AI Tools
        </Link>

        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
            <Stethoscope
              size={30}
              className="text-red-600"
            />
          </div>

          <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
            Crop Disease Detection
          </h1>

          <p className="mt-2 text-gray-500">
            Upload a crop or leaf image for an AI-powered disease analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Upload */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-bold text-[#343E4F]">
              Upload Crop Image
            </h2>

            {!preview ? (
              <label className="flex min-h-[350px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:border-[#E57036] hover:bg-orange-50">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
                  <Upload
                    size={30}
                    className="text-[#E57036]"
                  />
                </div>

                <h3 className="mt-5 font-bold text-[#343E4F]">
                  Upload an image
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  JPG, JPEG or PNG
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Maximum size: 5MB
                </p>

                <span className="mt-5 rounded-xl bg-[#E57036] px-5 py-3 text-sm font-semibold text-white">
                  Choose Image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>
            ) : (
              <div>
                <div className="overflow-hidden rounded-2xl border border-gray-200">
                  <img
                    src={preview}
                    alt="Uploaded crop"
                    className="h-[350px] w-full object-cover"
                  />
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">

                  <button
                    onClick={analyzeImage}
                    disabled={loading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white transition hover:bg-[#d7632e] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Sparkles size={19} />

                    {loading
                      ? "Analyzing..."
                      : "Analyze Image"}
                  </button>

                  <button
                    onClick={removeImage}
                    className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 transition hover:border-red-300 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Result */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-bold text-[#343E4F]">
              Analysis Result
            </h2>

            {!result ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl bg-gray-50 p-6 text-center">

                <ImageIcon
                  size={45}
                  className="text-gray-300"
                />

                <h3 className="mt-4 font-bold text-[#343E4F]">
                  No Analysis Yet
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  Upload a clear crop or leaf image and click
                  "Analyze Image".
                </p>
              </div>
            ) : (
              <div>

                <div className="rounded-2xl bg-green-50 p-5">

                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={28}
                      className="text-green-600"
                    />

                    <div>
                      <p className="text-xs text-green-600">
                        Detection Result
                      </p>

                      <h3 className="text-xl font-bold text-[#343E4F]">
                        {result.disease}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-500">
                        Confidence
                      </span>

                      <span className="font-bold text-green-600">
                        {result.confidence}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-green-500"
                        style={{
                          width: `${result.confidence}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-5">

                  <div className="flex gap-3">
                    <AlertTriangle
                      size={22}
                      className="shrink-0 text-[#E57036]"
                    />

                    <div>
                      <h3 className="font-bold text-[#343E4F]">
                        Recommendation
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {result.advice}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-xs leading-5 text-gray-400">
                  This is currently a frontend demonstration. The
                  production version will connect to a trained crop
                  disease detection model.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}