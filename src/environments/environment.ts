
export const baseUrl = "https://localhost:7071";

export const urlBlobStorage = "https://bibliotecatest1.blob.core.windows.net/qa-biblioteca/"

export const urls ={
    Login:"/user/login",
    GetUsers:"/user",
    CreateUser:"/user/create",
    DeleteUser:"/user/delete",
    GetEjemplares:"/catalogo",
    CreateEjemplar:"/catalogo/create",
    UdateEjemplar:"/catalogo/update",
    DeleteEjemplar:"/catalogo/delete"
}

export const urlRedirectIsAuthenticated = '/panel';

export const urlAnonymous = [urls.Login];

export const environment ={
    production: false
};