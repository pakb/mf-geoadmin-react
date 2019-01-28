// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import 'ol/ol.css'

// React
import React from "react";
import ReactDOM from "react-dom";

import jQuery from 'jquery';
// OpenLayers 5
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerGroup from 'ol/layer/Group';
import OlLayerTile from 'ol/layer/Tile';
// import OlSourceOsm from 'ol/source/osm';
import OlSourceTileJson from 'ol/source/tilejson';
import OlVectorTileSource from 'ol/source/VectorTile';
import OlMVTFormat from 'ol/format/MVT';
import { fromLonLat } from 'ol/proj';

import olms from 'ol-mapbox-style';

// ReactGeo
import { LayerTree } from '@terrestris/react-geo';

const layerGroup = new OlLayerGroup({
    name: 'Layergroup',
    layers: [
//         new OlLayerTile({
//             name: 'Swisstopo VectorTiles',
//             minResolution: 200,
//             maxResolution: 2000,
//             source: new OlVectorTileSource({
//                 url: 'https://mf-geoadmin3.int.bgdi.ch/mvt/1901101100/layersConfig.en.json',
//                 crossOrigin: 'anonymous',
//                 format: new OlMVTFormat()
//             })
//         }),
//         new OlLayerTile({
//             name: 'World borders layer',
//             minResolution: 2000,
//             maxResolution: 20000,
//             source: new OlSourceTileJson({
//                 url: 'https://api.tiles.mapbox.com/v3/mapbox.world-borders-light.json?secure',
//                 crossOrigin: 'anonymous'
//             })
//         })
    ]
});

const map = new OlMap({
    layers: [
        // new OlLayerTile({
        //     name: 'OSM',
        //     source: new OlSourceOsm()
        // }),
        layerGroup
    ],
    view: new OlView({})
});


const Index = () => {
    return (
        <div>
            <div id="map" style={{ height: '100%' }} />
            <span>{'Please note that the layers have resolution restrictions, please zoom in and out to see how the trees react to this.'}</span>
            <div className="example-block">
                <span>{'Autoconfigured with topmost LayerGroup of passed map:'}</span>
                <LayerTree map={map} />
            </div>
        </div>
    )
};

ReactDOM.render(<Index />,
    document.getElementById("index"),
    () => {
        map.setTarget('map');
        jQuery.getJSON('https://cms.geo.admin.ch/test/style006_custom.json', (styleJson) => {
            console.log(map, styleJson)    
            olms(map, styleJson);
        });
    });
