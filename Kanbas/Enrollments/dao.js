import model from "./model.js";
export const createEnrollment = (enrollment) => {
	delete enrollment._id
	return model.create(enrollment);
};
export const findAllEnrollments = () => model.find();
export const findEnrollmentById = (enrollmentId) => model.findById(enrollmentId);
export const findEnrollmentsByUser = (userId) => model.find({ user: userId });
export const findEnrollmentsByCourse = (courseId) => model.find({ course: courseId });
export const deleteEnrollment = (enrollmentId) => model.deleteOne({ _id: enrollmentId });
export const deleteEnrollmentsByCourse = (courseId) => model.deleteMany({course: courseId});