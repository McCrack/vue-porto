import STATE from "../state";

export default function showAlert(alert) {
	if (typeof alert.message === 'string') {
		STATE.Notifications.push(alert);
	} else {
		for (let field in alert.message) {
			STATE.Notifications.push(
				{
					...alert,
					caption: field,
					message: alert.message[field],
				}
			);

		}
	}
}