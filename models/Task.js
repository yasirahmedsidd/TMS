const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "tms_user",
  },
  task: {
    type: Object,
    required: true,
  },
});

module.exports = Task = model("tms_task", TaskSchema);
