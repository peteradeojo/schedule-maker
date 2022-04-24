const mongoose = require('mongoose');

const { Schema } = mongoose;

const SlotSchema = new Schema({
	row: Number,
	column: Number,
	description: String,
});

const ScheduleSchema = new Schema({
	columns: [
		// number of time divisions of each activity
		{
			title: String,
		},
	],
	rows: [
		// number of days
		{
			name: String,
		},
	],
	slots: [SlotSchema],
});

module.exports = mongoose.model('schedule', ScheduleSchema);
