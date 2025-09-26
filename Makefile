v2_consumer_install:
	cd v2_spec/consumer && npm install --registry=http://localhost:4873

v2_consumer_test:
	cd v2_spec/consumer && npm run test

v2_consumer_publish_standalone:
	cd v2_spec/consumer && npm run pact:publish

v2_consumer_publish_nestjs_pact:
	cd v2_spec/consumer && CI=true npm run pact:publish:ts

v2_provider_install:
	cd v2_spec/provider && npm install --registry=http://localhost:4873


v2_provider_test_local:
	cd v2_spec/provider && PACT_URL=$$PWD/../consumer/pact/pacts/"NestJS Consumer Example-NestJS Provider Example".json npm run test

v2_provider_verify_broker:
	cd v2_spec/provider && npm run test

v2_provider_verify_publish_broker:
	cd v2_spec/provider && CI=true npm run test



v3_consumer_install:
	cd v3_spec/consumer && npm install

v3_consumer_test:
	cd v3_spec/consumer && npm run test

v3_consumer_publish_standalone:
	cd v3_spec/consumer && npm run pact:publish

v3_consumer_publish_nestjs_pact:
	cd v3_spec/consumer && CI=true npm run pact:publish:ts

v3_provider_install:
	cd v3_spec/provider && npm install

v3_provider_test_local:
	cd v3_spec/provider && PACT_URL=$$PWD/../consumer/pact/pacts/"NestJS Consumer Example-NestJS Provider Example".json npm run test

v3_provider_verify_broker:
	cd v3_spec/provider && npm run test

v3_provider_verify_publish_broker:
	cd v3_spec/provider && CI=true npm run test