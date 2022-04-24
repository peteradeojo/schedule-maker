# What does a schedule look like

|       | Monday  | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday |
| ----- | :-----: | ------: | --------- | -------- | ------ | -------- | ------ |
| 8-9   | Slot 1  |  Slot 1 | Slot 1    |
| 9-10  | Slot 2  |  Slot 2 | Slot 2    |
| 10-11 | Slot 3  |  Slot 3 | Slot 3    |
| 11-12 | Slot 4  |  Slot 4 | Slot 4    |
| 12-1  | Slot 5  |  Slot 5 | Slot 5    |
| 1-2   | Slot 6  |  Slot 6 | Slot 6    |
| 2-3   | Slot 7  |  Slot 7 | Slot 7    |
| 3-4   | Slot 8  |  Slot 8 | Slot 8    |
| 4-5   | Slot 9  |  Slot 9 | Slot 9    |
| 5-6   | Slot 10 | Slot 10 | Slot 10   |

# Schema Definition

```js
const SlotSchema = new Schema({
	row: Number,
	column: Number,
	description: String
});

const ScheduleSchema = new Schema({
	columns: [ // number of time divisions of each activity
		{
			title: String,
		},
	],
	rows: [ // number of days
		{
			name: String,
		},
	];
	slots: [
		SlotDefinition
	]
});
```
