export default function showPreLoader(LOADING,start) {
	const startTime = Number(start);
	let duration = null;
	let alreadyShow = false;

	const delayPreLoader = () =>{
		if(!alreadyShow && duration) {
			const preloaderDelay = Number(process.env.VUE_APP_PRELOADER_DELAY);
			const preloaderDuration = Number(process.env.VUE_APP_PRELOADER_DURATION);
			if(duration - preloaderDelay < preloaderDuration){
				setTimeout(() => {
					LOADING.value = false;
				},500);
			} else {
				LOADING.value = false;
			}
			alreadyShow = true;
		}
	};
	
	const showPreLoader = ()=>{
		LOADING.value = true;
		return setTimeout(() => {
			delayPreLoader();	
		}, process.env.VUE_APP_PRELOADER_DELAY);
	};

	const setDuration = (response) => {
		duration =  Date.now() - startTime;
		delayPreLoader();
		return response;
	};

	return { showPreLoader, setDuration };
}