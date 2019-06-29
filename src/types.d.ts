declare type CalculationType = 'Proportions' | 'Tendencies';

declare interface Calculator {
  processRecord(value: string): void;
  processResults(normalizer: Normalizer, language: string): void;
}

declare interface CarProperty {
  columnName: string;
  filterValues?: FilterValues;
  name: string;
  normalizerMappings?: NormalizerMappings;
  type: CalculationType;
  valueCategories?: ValueCategory[];
  valueLabels?: ValueLabels;
}

declare interface CommandLineOptions {
  language?: string;
}

declare interface CsvRecord {
  [columnName: string]: string;
}

declare interface Filter {
  filter(record: CsvRecord, property: CarProperty, acceptedValues: string[][]): boolean;
}

declare interface FilterValues {
  [category: string]: string[];
}

declare interface Mapping {
  [value: string]: string;
}

declare interface Normalizer {
  normalize(proportions: Proportion[], totalWithValue: number, input: NormalizerMappings): Proportion[];
}

declare interface NormalizerMappings {
  aliases: Mapping;
  abbreviations: Mapping;
}

declare interface PropertyFilter {
  acceptedValues: string[][];
  filter: Filter;
  property: CarProperty;
}

declare interface PropertyCalculation extends CarProperty {
  calculator: Calculator;
  normalizer?: Normalizer;
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

declare interface ValueCategory {
  label: string;
  max?: number;
  min?: number;
}
