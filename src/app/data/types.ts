export type MeowFact = string;

export interface GetMeowFactsRequestParams {
  lang?: string;
  count?: number;
}

export interface GetMeowFactRequestParams {
  id?: string;
  lang?: string;
}

export interface GetMeowFactsResponse {
  data: MeowFact[];
}
