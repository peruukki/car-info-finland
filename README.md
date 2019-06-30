# Finnish Car Information

Discover public Finnish car registry information.

## Setting up

The car registry data is too large to include in this repository, so download it from the
[Finnish Transport and Communications Agency](https://www.traficom.fi/en/statistics-and-publications/open-data)
site (it's in the "Ajoneuvojen avoin data 5.4" section). You can put the file to the git-ignored `data` directory
in this repository.

## Building

```sh
npm run build
```

This compiles the TypeScript files in `src` into JavaScript in `dist`.

## Running

_Remember to run the build first (see above), otherwise you will get a `Cannot find module './dist/index'` error when running `car-info`._

Process the car info and show some interesting data:

```sh
./car-info process [options] <filename>

Options:
  -c, --CO2 <CO2 emissions in g/km>  show percentile for given CO2 emissions when compared to other cars
  -e, --length <length in mm>        show percentile for given length when compared to other cars
  -w, --width <width in mm>          show percentile for given width when compared to other cars
  -l, --language <language code>     language in which to show info labels: fi|sv|en (default: "fi")
  -h, --help                         output usage information
```

Example without options: `./car-info process data/data.csv`.

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
