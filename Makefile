.PHONY: dist

dist:
	mkdir -p dist
	cp -v .nojekyll dist
	cp -v index.html dist
	rsync -av --prune-empty-dirs --include "*/"  --include="*.png" --exclude="*" tilesets/ dist/tilesets
	set -eu; for MAPS_DIRECTORY in fossgis-update-2021; do \
		rsync -av --prune-empty-dirs --include "*/"  --include="*.png" --include="*.json" --exclude="*" $${MAPS_DIRECTORY}/ dist/$${MAPS_DIRECTORY}; \
	done

clean:
	rm -rf dist
