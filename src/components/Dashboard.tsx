import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [d, setD] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const worker = new Worker(new URL('./WebWorkerSumIterations.ts', import.meta.url));

        worker.postMessage({ iterations: 1e8 });

        worker.onmessage = (event) => {
            setD(event.data.result);
            setLoading(false);
            worker.terminate();
        };

        return () => worker.terminate();
    }, []);

    return <div>{loading ? 'Calculating...' : d}</div>;
}
