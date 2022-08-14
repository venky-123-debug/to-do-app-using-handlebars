const mongoose = require("mongoose")

const activitySchema = new mongoose.Schema({
  title: { type: String, default: "Activity name" },
  description: { type: String, default: "This activity is about..." },
  status: { type: String, default: "pending" }
})

module.exports.Activity = mongoose.model("activity", activitySchema)