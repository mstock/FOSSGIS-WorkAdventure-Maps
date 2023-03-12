# FOSSGIS-WorkAdventure-Maps

This repo contains some maps built with the [Tiled Map Editor](https://www.mapeditor.org/) which might be used at some [FOSSGIS](https://fossgis.de/) events in a [WorkAdventure](https://workadventu.re/)-based world. See the ["Create your map!" howto](https://workadventu.re/create-map.html) about how to build maps.

## Map development

The [official WorkAdventure documentation](https://workadventu.re/map-building/) is pretty comprehensive, so it is recommendable to read it. This repository also contains a simple, Python3 based web server in `serve-maps.py` which uses [`http.server`](https://docs.python.org/3/library/http.server.html) to serve the content of this repository:

	python3 serve-maps.py

By default, this starts a [local web server on port 8000](http://localhost:8000) which serves the [`index.html`](index.html) file and the maps. [`index.html`](index.html) contains a hard-coded list of maps in this repository which gets turned into a list of links to the public WorkAdventure instance using the local URLs of the maps, so they can be viewed in the browser by following the links.

## Maps

- [FOSSGIS Update 2021](fossgis-update-2021/fossgis-update.json) - Map which was used at the [FOSSGIS Update 2021 event](https://fossgis.de/news/2020_12_04_fossgis-update/). [View on play.workadventu.re.](https://play.workadventu.re/_/global/fossgis.github.io/FOSSGIS-WorkAdventure-Maps/fossgis-update-2021/fossgis-update.json)
- [FOSSGIS-Konferenz 2022](fossgis-2022/base.json) - Map which was used at the [FOSSGIS-Konferenz 2022 event](https://fossgis-konferenz.de/2022/). [View on play.workadventu.re.](https://play.workadventu.re/_/global/fossgis.github.io/FOSSGIS-WorkAdventure-Maps/fossgis-2022/base.json)

## Used Tilesets

Please note that some of the tilesets are included as [Git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules), so you will have to `git submodule update --init --recursive` them before they are available.

* [rC3-OSM-Tileset](https://github.com/mstock/rC3-OSM-Tileset): Tileset based on the [OpenStreetMap Carto](https://github.com/gravitystorm/openstreetmap-carto) map style.
* [world-tiles](https://git.cccv.de/rc3/world-tiles): Shared tilesets for the [rC3 world](https://rc3.world) that was built for the [rC3 (Remote Chaos Experience) conference](https://events.ccc.de/2020/09/04/rc3-remote-chaos-experience/). Please note that these tilesets may be provided under a different license than the remainder of this repository.
* [VX First Seed Material tile add ons](https://rmgamematerial.wordpress.com/2011/04/10/fsmtiles/): Based on [FSM VX Extra Tiles](https://web.archive.org/web/20131206031935/http://www.tekepon.net/fsm/modules/refmap/index.php?mode=vx-map). Some of graphic data in this software are free game resources distributed by [REFMAP](http://www.tekepon.net/fsm). You must not use the graphic data which is in this software, for the purpose except playing this game. When you want to get these resources, go to the [website above](https://web.archive.org/web/20131211164046/http://www.tekepon.net/fsm/modules/refmap/index.php). Modified by [Soruve](https://rmgamematerial.wordpress.com/author/soruve/).

## Contained Tilesets

### FOSSGIS-UPDATE 2021 Logos

![FOSSGIS-UPDATE Logos](fossgis-update-2021/tilesets/logos.png)

`fossgis-update-2021/tilesets/logos.png`: Logos for the FOSSGIS-UPDATE 2021 event map.

### FOSSGIS-UPDATE 2021 Labels

![FOSSGIS-UPDATE Labels](fossgis-update-2021/tilesets/labels.png)

`fossgis-update-2021/tilesets/labels.png`: Labels for the FOSSGIS-UPDATE 2021 event map.

## License

[CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/). Please note that tilesets, photos etc. tend to be under different licenses.

### Logos

* [FOSSGIS logo](https://commons.wikimedia.org/wiki/File:FOSSGIS_Logo.png): FOSSGIS e.V., [Creative Commons Attribution-Share Alike 3.0 Germany](https://creativecommons.org/licenses/by-sa/3.0/de/deed.en)
* [OpenStreetMap logo](https://wiki.openstreetmap.org/wiki/File:Public-images-osm_logo.svg): Ken Vermette, [Creative Commons Attribution-ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
* [uMap logo](https://wiki.openstreetmap.org/wiki/File:Umap_logo.svg): [Ybon](https://wiki.openstreetmap.org/wiki/User:Ybon), [Creative Commons Attribution-ShareAlike 2.0](https://creativecommons.org/licenses/by-sa/2.0/)


