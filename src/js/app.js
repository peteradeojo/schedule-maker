$(() => {
	const storageKey = 'data';
	const timingForm = $('#timing-form');
	const daysForm = $('#days-form');
	const actionForm = $('#action-form');

	/**
	 *
	 * @returns {{days: [any], timings: [any], slots: [{day: number, time: number, description: string}]}} schedule
	 */
	const loadSchedule = () => {
		return JSON.parse(localStorage.getItem(storageKey));
	};

	const saveSchedule = (data) => {
		localStorage.setItem(storageKey, JSON.stringify(data));
	};

	if (!loadSchedule()) {
		saveSchedule({
			timings: [],
			days: [],
			slots: [],
		});
	}

	const loadDaysIntoSelect = (schedule) => {
		document.querySelector('#days-list').innerHTML = '';
		for (let i = 0; i < schedule.days.length; i += 1) {
			let text = `<option>${schedule.days[i]}</option>`;

			document.querySelector('#days-list').innerHTML += text;
		}
	};

	const loadTimesIntoSelect = (schedule) => {
		document.querySelector('#times-list').innerHTML = '';
		for (let i = 0; i < schedule.timings.length; i += 1) {
			let text = `<option>${schedule.timings[i]}</option>`;

			document.querySelector('#times-list').innerHTML += text;
		}
	};

	const renderSchedule = () => {
		const schedule = loadSchedule();

		const table = document.createElement('table');
		const render = document.createElement('tbody');
		table.classList.add('render-table');

		if (schedule.timings.length == 0 && schedule.days.length == 0) {
			render.innerHTML = `<tr style="padding: 20px 0;">
				<td colspan=16 style="padding: 12px; text-align:center">Create a schedule to view here</td>
			</tr>`;
		} else {
			const firstRow = document.createElement('tr');
			firstRow.innerHTML = `<td class='index-useless-td'></td>`;

			for (let i = 0; i < schedule.timings.length; i += 1) {
				firstRow.innerHTML += `<th>${schedule.timings[i]}</th>`;
			}
			render.appendChild(firstRow);
			for (let x = 0; x < schedule.days.length; x += 1) {
				let block = `<tr><td>${schedule.days[x]}</td>`;
				for (let i = 0; i < schedule.timings.length; i += 1) {
					let desc = schedule.slots.find(
						(slot, index) => slot.day == x && slot.time == i
					);
					block += `<td>${desc ? desc.description : ''}</td>`;
				}
				block += '</tr>';

				render.innerHTML += block;
			}
		}

		document.querySelector('#schedule-render').innerHTML = ``;
		document.querySelector('#schedule-render').appendChild(table);
		table.appendChild(render);

		loadDaysIntoSelect(schedule);
		loadTimesIntoSelect(schedule);
	};

	// Save new timings to Local
	timingForm.on('submit', function (e) {
		e.preventDefault();

		const timing = this.timing.value;

		const storage = loadSchedule();
		if (!storage.timings.includes(timing)) {
			storage.timings.push(timing);
			saveSchedule(storage);
			renderSchedule();
			this.reset();
		}
	});

	daysForm.on('submit', function (e) {
		e.preventDefault();
		const day = this.day.value;
		const schedule = loadSchedule();
		if (!schedule.days.includes(day)) {
			schedule.days.push(day);
			saveSchedule(schedule);
			renderSchedule();
			this.reset();
		}
	});

	const updateScheduleEntry = (d, t, a) => {
		const schedule = loadSchedule();
		const dayIndex = schedule.days.indexOf(d);
		const timeIndex = schedule.timings.indexOf(t);

		const slot = {
			day: dayIndex,
			time: timeIndex,
			description: a,
		};

		const correct = schedule.slots.filter((s, index) => {
			if (s.time !== slot.time || s.day !== slot.day) {
				return s;
			}
		});

		correct.push(slot);
		schedule.slots = correct;

		saveSchedule(schedule);
		renderSchedule();
	};

	actionForm.on('submit', function (e) {
		e.preventDefault();
		const day = this.day.value;
		const time = this.timing.value;
		const action = this.activity.value;

		updateScheduleEntry(day, time, action);
		this.reset();
	});

	loadDaysIntoSelect(loadSchedule());
	loadTimesIntoSelect(loadSchedule());
	renderSchedule();
});
