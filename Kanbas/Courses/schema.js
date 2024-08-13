import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
	name: { type: String, required: true },
	number: String,
	startDate: Date,
	endDate: Date,
	department: String,
	credits: Number,
	dob: Date,
	description: String,
	image: String,
},
	{ collection: "courses" }
);
export default courseSchema;
