# EERC.INFO (eerc.info)

EERC website

## Install the dependencies

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn run lint
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### Using the site:

First off, make sure it's installed (see `Install the dependencies` above).
Then, to build and release:

```
yarn build
```

If you haven't logged into firebase before, you'll need to run

```
firebase login
```

If you are developing, you can serve a local-only dev site. This can be run in two modes, PWA and SPA. PWA allegedly has issues hot-reloading, so best to usually go with SPA unless you're fucking with the PWA stuff.
To serve then, run

```
yarn dev
# or
yarn dev -m pwa
```

I'm not sure on the following, but in dev mode you may have to run

```
firebase deploy --only hosting
```

but, probably not.

Eventually a script will be made to do these things automagically.
