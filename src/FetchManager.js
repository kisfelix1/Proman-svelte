export async function postFetch(url, payload){
    let response = await fetch(url, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body:payload,
    });
    if (response.status === 200) {
        return response.json();
    };
}

export async function getFetch(url){
    let response = await fetch(url);
    if (response.status === 200) {
        return response.json();
    };
}