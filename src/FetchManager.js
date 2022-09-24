export async function postFetch(url, payload){
    let response = await fetch(url, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload),
    });
    if (response.status === 200) {
        return response.json();
    };
}

export async function putFetch(url, payload) {
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (response.status === 200) {
      return response.json();
    }
}

export async function getFetch(url){
    let response = await fetch(url);
    if (response.status === 200) {
        return response.json();
    };
}

export async function deleteFetch(url) {
    let response = await fetch(url,{method: "DELETE"});
    if (response.status === 200) {
        return response.json();
    };
}

