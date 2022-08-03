export class Url {

    public static get baseURL(): string {
        let URL_LOCAL = "http://localhost:10000/citas/api/";
        let URL_PRODUCCION = "https://backend-citas.herokuapp.com/citas/api/";
        
        return URL_LOCAL;

    }
}
