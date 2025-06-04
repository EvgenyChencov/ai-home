self.onmessage = (event) => {
    const { iterations } = event.data;
    let t = 0;
    
    for (let i = 0; i < iterations; i++) {
        t += i;
    }
    
    self.postMessage({ result: t });
};