declare interface Calculator {
  processRecord: (value: string) => void;
  processResults: (property: CarProperty, normalizer: Normalizer, language: string) => void;
}

declare interface CarProperty {
  columnName: string;
  filterValues?: FilterValues;
  name: string;
  normalizer?: NormalizerValueMappings;
  valueLabels?: ValueLabels;
}

declare interface CsvRecord {
  [columnName: string]: string;
}

declare interface Filter {
  filter: (record: CsvRecord, property: CarProperty, acceptedValues: string[][]) => boolean;
}

declare interface FilterValues {
  [category: string]: string[];
}

declare interface Mapping {
  [value: string]: string;
}

declare interface Normalizer {
  normalize: (proportions: Proportion[], totalWithValue: number, input: NormalizerValueMappings) => Proportion[];
}

declare interface NormalizerValueMappings {
  aliases: Mapping;
  abbreviations: Mapping;
}

declare interface PropertyFilter {
  acceptedValues: string[][];
  filter: Filter;
  property: CarProperty;
}

declare interface PropertyCalculation {
  calculator: Calculator;
  normalizer?: Normalizer;
  property: CarProperty;
}

declare interface Proportion {
  label: string;
  count: number;
  percentage: string;
}

declare interface TranslatedString {
  en: string;
  fi: string;
  sv: string;
  [language: string]: string;
}

declare interface ValueLabels {
  [value: number]: TranslatedString;
  [value: string]: TranslatedString;
}