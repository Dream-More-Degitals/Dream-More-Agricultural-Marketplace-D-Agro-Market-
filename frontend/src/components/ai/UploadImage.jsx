import React, { useState } from "react";
import { Upload, CheckCircle2 } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        crop: "Coffee Arabica (Sidama Variant)",
        diagnosis: "Early Coffee Leaf Rust (Hemileia vastatrix)",
        confidence: "96.4%",
        severity: "Moderate",
        recommendation: "Apply organic copper-based fungicide spray. Ensure proper shade management and pruning. AI recommends treatment within 5 days to prevent yield loss."
      });
    }, 1800);
  };

  return (
    <Card className="p-6 rounded-3xl border border-slate-200">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-[#343E4F] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-[#107C41]">🌿</span>
            AI Crop Disease & Quality Diagnosis
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Upload a photo of your crop leaf, grain batch, or coffee bean sample for instant AI analysis.
          </p>
        </div>

        <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-[#E57036] transition bg-slate-50">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
          />

          {selectedFile ? (
            <div className="flex flex-col items-center gap-3">
              <img
                src={selectedFile}
                alt="Selected crop"
                className="h-36 w-36 object-cover rounded-xl border border-slate-200 shadow-sm"
              />
              <span className="text-xs font-semibold text-[#107C41] flex items-center gap-1">
                <CheckCircle2 size={14} /> Image Loaded Ready for AI Scan
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-4">
              <div className="p-3 bg-white rounded-full text-[#E57036] shadow-sm">
                <Upload size={24} />
              </div>
              <span className="text-xs font-bold text-[#343E4F]">
                Drag and drop your crop photo here, or click to browse
              </span>
              <span className="text-[11px] text-slate-400">Supports JPG, PNG, WEBP up to 10MB</span>
            </div>
          )}
        </div>

        {selectedFile && (
          <Button
            variant="orange"
            fullWidth
            onClick={handleAnalyze}
            disabled={analyzing}
          >
            {analyzing ? "AI Vision Engine Scanning..." : "Run AI Diagnosis"}
          </Button>
        )}

        {result && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-emerald-800 tracking-wider">
                Diagnosis Report
              </span>
              <span className="text-xs font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                Confidence: {result.confidence}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-[#343E4F] text-base">{result.diagnosis}</h4>
              <p className="text-xs text-slate-600 font-medium">Crop: {result.crop}</p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-emerald-100 text-xs text-slate-700 leading-relaxed">
              <strong className="text-[#107C41] block mb-1">Recommended Action:</strong>
              {result.recommendation}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default UploadImage;
