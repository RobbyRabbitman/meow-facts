export type MeowFact = string;

export interface GetMeowFactsRequestParams {
  lang?: string;
  count?: number;
}

export interface GetMeowFactsResponse {
  data: MeowFact[];
}
