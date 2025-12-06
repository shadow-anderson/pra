import mongoose from "mongoose";

const KpiSchema = new mongoose.Schema({

  user_id: { type: String, ref: "User", required: true },
  period: { type: String, required: true },  // "2025-10"

  kpi_code: { type: String, required: true },  // e.g., "file_disposal_rate"

  raw_value: Number,     // actual numeric result before normalization
  score: Number,         // normalized 0–100 score

  source_count: Number,  // number of activities used in calculation

  computed_at: { type: Date, default: Date.now }
});

KpiSchema.index(
  { user_id: 1, period: 1, kpi_code: 1 },
  { unique: true }
);

export default mongoose.model("Kpi", KpiSchema);
