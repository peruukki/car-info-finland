export interface CarProperty {
  columnName: string;
  filterValues?: FilterValues;
  name: string;
  normalizer?: NormalizerValueMappings;
  valueLabels?: ValueLabels;
}

export interface FilterValues {
  [category: string]: string[];
}

export interface Normalizer {
  normalize: (proportions: Proportion[], totalWithValue: number, input: NormalizerValueMappings) => Proportion[];
}

export interface NormalizerValueMappings {
  aliases: Map<string, string>;
  abbreviations: Map<string, string>;
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
