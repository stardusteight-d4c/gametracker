NETWORK_NAME = trackx

network:
	docker network create $(NETWORK_NAME)

init:
	npm install
	docker compose build
	docker compose up -d
	docker compose exec nestjs bash

end:
	docker compose down

psql:
	docker compose exec postgres psql -U root -d trackx

bcrypt-update-bin:
	 npm rebuild bcrypt --update-binary