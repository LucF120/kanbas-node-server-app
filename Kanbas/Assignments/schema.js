import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
	title: { type: String, required: true },
	course: { type: String, required: true },
    description: String,
    submissionType: String,
    textEntry: Boolean,
    websiteURL: Boolean,
    mediaRecordings: Boolean,
    studentAnnotation: Boolean,
    fileUploads: Boolean,
    availableDate: Date,
    dueDate: Date,
    untilDate: Date,
    multipleModules: Boolean,
    points: Number,
},
	{ collection: "assignments" }
);
export default assignmentSchema;
