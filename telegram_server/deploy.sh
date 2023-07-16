# Build container and deploy to COntainer Registry
gcloud builds submit --tag gcr.io/telefonica-solution/telegram-pubsub
gcloud run deploy telegram-pubsub-service \
	--image gcr.io/telefonica-solution/telegram-pubsub \
	--no-allow-unauthenticated

