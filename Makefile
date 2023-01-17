v2_pactjs_v9_consumer_install:
	cd v2_spec/pactjs_v9_nestjspact_v2/consumer && npm install

v2_pactjs_v9_consumer_test:
	cd v2_spec/pactjs_v9_nestjspact_v2/consumer && npm run test

v2_pactjs_v9_consumer_publish_standalone:
	cd v2_spec/pactjs_v9_nestjspact_v2/consumer && npm run pact:publish

v2_pactjs_v9_consumer_publish_nestjs_pact:
	cd v2_spec/pactjs_v9_nestjspact_v2/consumer && CI=true npm run pact:publish:ts

v2_pactjs_v9_provider_install:
	cd v2_spec/pactjs_v9_nestjspact_v2/provider && npm install

v2_pactjs_v9_provider_test_local:
	cd v2_spec/pactjs_v9_nestjspact_v2/provider && PACT_URL=$$PWD/../consumer/pact/pacts/nestjs_consumer_example-nestjs_provider_example.json npm run test

v2_pactjs_v9_provider_verify_broker:
	cd v2_spec/pactjs_v9_nestjspact_v2/provider && npm run test

v2_pactjs_v9_provider_verify_publish_broker:
	cd v2_spec/pactjs_v9_nestjspact_v2/provider && CI=true npm run test

v2_pactjs_v10_consumer_install:
	cd v2_spec/pactjs_v10_nestjspact_v3/consumer && npm install && mkdir -p pact/pacts

v2_pactjs_v10_consumer_test:
	cd v2_spec/pactjs_v10_nestjspact_v3/consumer && npm run test

v2_pactjs_v10_consumer_publish_standalone:
	cd v2_spec/pactjs_v10_nestjspact_v3/consumer && npm run pact:publish

v2_pactjs_v10_consumer_publish_nestjs_pact:
	cd v2_spec/pactjs_v10_nestjspact_v3/consumer && CI=true npm run pact:publish:ts

v2_pactjs_v10_provider_install:
	cd v2_spec/pactjs_v10_nestjspact_v3/provider && npm install

v2_pactjs_v10_provider_test_local:
	cd v2_spec/pactjs_v10_nestjspact_v3/provider && PACT_URL=$$PWD/../consumer/pact/pacts/"NestJS Consumer Example-NestJS Provider Example".json npm run test

v2_pactjs_v10_provider_verify_broker:
	cd v2_spec/pactjs_v10_nestjspact_v3/provider && npm run test

v2_pactjs_v10_provider_verify_publish_broker:
	cd v2_spec/pactjs_v10_nestjspact_v3/provider && CI=true npm run test

v3_pactjs_v10_consumer_install:
	cd v3_spec/pactjs_v10_nestjspact_v3/consumer && npm install

v3_pactjs_v10_consumer_test:
	cd v3_spec/pactjs_v10_nestjspact_v3/consumer && npm run test

v3_pactjs_v10_consumer_publish_standalone:
	cd v3_spec/pactjs_v10_nestjspact_v3/consumer && npm run pact:publish

v3_pactjs_v10_consumer_publish_nestjs_pact:
	cd v3_spec/pactjs_v10_nestjspact_v3/consumer && CI=true npm run pact:publish:ts

v3_pactjs_v10_provider_install:
	cd v3_spec/pactjs_v10_nestjspact_v3/provider && npm install

v3_pactjs_v10_provider_test_local:
	cd v3_spec/pactjs_v10_nestjspact_v3/provider && PACT_URL=$$PWD/../consumer/pact/pacts/"NestJS Consumer Example-NestJS Provider Example".json npm run test

v3_pactjs_v10_provider_verify_broker:
	cd v3_spec/pactjs_v10_nestjspact_v3/provider && npm run test

v3_pactjs_v10_provider_verify_publish_broker:
	cd v3_spec/pactjs_v10_nestjspact_v3/provider && CI=true npm run test