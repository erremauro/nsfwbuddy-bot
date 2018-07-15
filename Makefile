build: export NODE_ENV = production
build: test-clean
	yarn build

test: export NODE_ENV = test
test: export CI = true
test: test-clean
	yarn test

clean: test-clean
	rm -rf yarn-error*

test-clean:
	rm -rf ./*/test-tmp

clean-all:
	rm -rf ./node_modules
	make clean

bootstrap: clean-all
	yarn install
