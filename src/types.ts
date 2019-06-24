export interface CarProperty {
  columnName: string;
  filterValues?: FilterValues;
  name: string;
  normalizer?: NormalizerValueMappings;
  valueLabels?: ValueLabels;
}

export interface CsvRecord {
  [columnName: string]: string;
}

export interface FilterValues {
  [category: string]: string[];
}

export interface Mapping {
  [value: string]: string;
}

export interface Normalizer {
  normalize: (proportions: Proportion[], totalWithValue: number, input: NormalizerValueMappings) => Proportion[];
}

export interface NormalizerValueMappings {
  aliases: Mapping;
  abbreviations: Mapping;
}

export interface Proportion {
  label: string;
  count: number;
  percentage: string;
}

export interface TranslatedString {
  en: string;
  fi: string;
  sv: string;
  [language: string]: string;
}

export interface ValueLabels {
  [value: number]: TranslatedString;
  [value: string]: TranslatedString;
}
