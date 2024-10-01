export const fetchCrags = async () => {
    const res = await fetch("http://localhost:4000/crags");
    return res.json();
}

export const fetchCrag = async (cragId: string) => {
    const res = await fetch(`http://localhost:4000/crags/${cragId}`);
    return res.json();
}

export const fetchCragRoutes = async (cragId: string) => {
    const res = await fetch(`http://localhost:4000/crags/${cragId}?`);
    return res.json();
}