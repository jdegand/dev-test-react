export interface Country {
  id: string;
  name: string;
  code: string;
  population: number | null;
}

export interface RootObject {
  data: Country[];
}
