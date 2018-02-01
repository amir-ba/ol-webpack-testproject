# ol-webpack-testproject
A test project for learning `webpack` in combination with `ol`.in this project the following Openlayers features are used:

- Tooltip for vector layers on hover.
- Representation of the attribute data for vector layers on click with the help of `ol.interaction`.
- Data layers from a GeoJson source and a WFS source plus a Tile layer as a base map.
- An overlay point element  showing the users location using the `ol.Overlay` .
- A checkbox list from the available layers.
- Custom styling of the WFS layer based on attribute values.


Clone the project.

    git clone https://github.com/amir-ba/ol-webpack-testproject.git

Install the project dependencies.

    cd ol-webpack-testproject
    npm install

Start a debug server.

    npm start

Open `http://localhost:8080/` in your browser to see the app

Create a bundle for the browser.

    npm run build

and for production version 

    npm run build:prod

this creates the bundles in a new `dist` folder


    
 