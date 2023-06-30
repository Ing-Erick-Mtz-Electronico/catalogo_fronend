
export const baseUrl = "https://localhost:7071";

export const urlBlobStorage = "https://bibliotecatest1.blob.core.windows.net/qa-biblioteca/";
export const urlAlma = {
    base: "https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/",
    key: "?view=full&expand=None&apikey=l8xxca5a5ff8ccc34fc597e0359d7568541c"
} 

export const urls ={
    Login:"/user/login",
    GetUsers:"/user",
    CreateUser:"/user/create",
    UpdateUser:"/user/update/",
    DeleteUser:"/user/delete/",
    GetEjemplares:"/catalogo",
    CreateEjemplar:"/catalogo/create",
    UdateEjemplar:"/catalogo/update/",
    DeleteEjemplar:"/catalogo/delete/"
}

export const urlRedirectIsAuthenticated = '/panel';

export const urlAnonymous = [urls.Login];

export const environment ={
    production: false
};