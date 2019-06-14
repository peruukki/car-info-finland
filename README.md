# Finnish Car Information

Discover public Finnish car registry information.

## Setting up

The car registry data is too large to include in this repository, so download it from the
[Finnish Transport and Communications Agency](https://www.traficom.fi/en/statistics-and-publications/open-data)
site (it's in the "Ajoneuvojen avoin data 5.4" section). You can put the file to the git-ignored `data` directory
in this repository.

## Running

Process the car info and show some interesting data:

```sh
./car-info process [--language fi|sv|en] <filename>
```

Example: `./car-info process data/data.csv --language sv`.

The language option shows enumeration labels in the chosen language, the default is `fi`.

To get help:

```sh
./car-info -h
./car-info process -h
```

## Testing

```sh
npm test
```

## License

[MIT](LICENSE)
