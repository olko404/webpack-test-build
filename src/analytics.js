function createAnalytics() {
    let counter = 0;
    let isDestroyed =  false;
    const listener = () =>  counter++;
    console.log('a');

    document.addEventListener('click', listener) 
    return {
        destroy() {
            isDestroyed = true
            document.removeEventListener('click', listener)
        },
        
        getClicks() {
            if(isDestroyed) {
                return `analitics is destroyed  ${counter}`;
            }

            return counter;
        }
    }
}

window.analytics = createAnalytics();