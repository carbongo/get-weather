
# Get Weather

## Description
A simple weather request. The basic functionalities are described below.


```
get-weather [OPTION]

Options:
  -c, --city     City (required)
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]

Examples:
  get-weather -c (--city) London       Display current weather for London, UK
  get-weather -c (--city) "St Davids"  Display current weather for Saint Davids,
                                       Barbados
```

## Initialisation

Sign up for [WeatherStack](https://weatherstack.com/) and get the API Key. Make a copy of *config.sample.js* and rename it to *config.js*. Paste the API Key into the export variable inside of *config.js*.

> NOTE: Linking/unlinking may require *sudo* rights 

Before use:
```bash
npm i
npm link
```

After use:
```bash
npm unlink
```

## Usage

### Examples

```bash
$ get-weather -c Lunden
Lunden/Germany: 0°C, Partly cloudy
```
```bash
$ get-weather --city Andorra
Andorra La Vella/Andorra: -5°C, Patchy heavy snow
```
