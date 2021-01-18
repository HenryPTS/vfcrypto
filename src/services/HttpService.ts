export enum HttpMethod {
  Delete = "DELETE",
  Get = "GET",
  Post = "POST",
  Put = "PUT"
}

export enum HttpStatus {
  CONFLICT = 409,
  INTERNAL_SERVICE_ERROR = 500
}

export interface ISearchParams {
  [key: string]: string;
}

abstract class HttpService {
  public static generateUrl = (
    resourcePath: string,
    searchParams?: ISearchParams
  ) => {
    const apiKey = process.env.REACT_APP_API_KEY as string
    const apiUri = process.env.REACT_APP_API_URI as string
    const url = new URL(`${apiUri}${resourcePath}`);
    url.searchParams.append('api_key', apiKey)
    if (searchParams) {
      Object.entries(searchParams).forEach(searchParam => {
        const [key, value] = searchParam;
        url.searchParams.append(key, value);
      });
    }
    return url;
  };
}

export default HttpService;
