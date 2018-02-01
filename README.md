This repository is used as an example of [algolia/places#464](https://github.com/algolia/places/issues/464) issue.

It is a small Meteor project instantiating a Leaflet map and adding an Algolia
places input as a Leaflet control.

In development mode (command `meteor`), everything is fine, enter key and click
event after an Algolia search add a map marker as expected.

In production mode (see commands below), click event is not catched and no map
marker is added.

```shell
meteor build --directory /path/to/meteor/build
cd /path/to/meteor/build/bundle/programs/server
# npm --version 5.4.2
npm install
cd /path/to/meteor/build/bundle
# node --version 8.4.0
PORT=5000 ROOT_URL=http://localhost:5000 node main.js
```
