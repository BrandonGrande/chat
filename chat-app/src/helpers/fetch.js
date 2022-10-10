const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSinToken = async(endPoint,data,method = 'GET') =>{
    const url= `${baseUrl}/${endPoint}`;
    if (method ==='GET'){
        const resp = await fetch(url);
        return await resp.json();
    }else{
        const resp = await fetch(url,{
            method,
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        return await resp.json();
    }
}

export const fetchConToken = async(endPoint,data,method = 'GET') =>{

    const url= `${baseUrl}/${endPoint}`;
    const token = localStorage.getItem('token') || '';
    if (method ==='GET'){
        const resp = await fetch(url,{ 
            headers:{
                'x-token':token
            }
        });
        return await resp.json();
    }else{
        const resp = await fetch(url,{
            method,
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        
        return await resp.json();
    }

}