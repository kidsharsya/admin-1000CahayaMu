export type EmissionType = 'Individu' | 'Lembaga';

export interface EmissionRecord {
  name: string;
  type: EmissionType;
  emission: string;
  emission_avg: string;
  address: string;
  date: string;
}
