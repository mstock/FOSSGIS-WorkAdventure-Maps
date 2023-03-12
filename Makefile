.PHONY: dist

dist:
	mkdir -p dist
	cp -v .nojekyll dist
	cp -v index.html dist
	rsync -av --prune-empty-dirs --include "*/"  --include="*.png" --exclude="*" tilesets/ dist/tilesets
	set -eu; for MAPS_DIRECTORY in fossgis-update-2021 fossgis-2022 fossgis-2023; do \
		if [ -d $${MAPS_DIRECTORY}/pages ] ; then \
			for HTML_BUILDER in $$(find $${MAPS_DIRECTORY}/pages -name build-*-html); do \
				( cd $$(dirname $${HTML_BUILDER}); ./$$(basename $${HTML_BUILDER}) ); \
			done; \
		fi; \
		rsync -av --prune-empty-dirs --include "*/" --include="*.png" --include="*.jpg" --include="*.jpeg" --include="*.JPG" --include="*.json" --include="*.html" --include="*.css" --include="*.js" --exclude="*" $${MAPS_DIRECTORY}/ dist/$${MAPS_DIRECTORY}; \
		if [ -f dist/$${MAPS_DIRECTORY}/pages/package.json ] ; then \
			( cd dist/$${MAPS_DIRECTORY}/pages && npm ci ); \
		fi; \
	done

clean:
	rm -rf dist
