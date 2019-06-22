export interface CarProperty {
  columnName: string;
  filterValues?: FilterValues;
  name: string;
  normalizer?: Normalizer;
  valueLabels?: ValueLabels;
}

export interface FilterValues {
  [category: string]: string[];
}

export interface Normalizer {
  aliases: Map<string, string>;
  abbreviations: Map<string, string>;
}

export interface TranslatedString {
  en: string;
  fi: string;
  sv: string;
}

export interface ValueLabels {
  [value: number]: TranslatedString;
  [value: string]: TranslatedString;
}
