dev: 
	yarn start:dev

module:
	nest g mo $(name) --no-spec

controller:
	nest g co $(name) --no-spec

service:
	nest g s $(name) --no-spec