import { STATE } from '@/Ship/';

export default (namePopUp, props) => {
	STATE.POPUP.PROPS = props;
	STATE.POPUP.SHOW = true;
	STATE.POPUP.NAME = namePopUp;
};
