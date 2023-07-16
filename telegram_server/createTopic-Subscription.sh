gcloud pubsub topics create myTelegramRunTopic
gcloud iam service-accounts create cloud-run-pubsub-invoker \
    --display-name "Cloud Run Pub/Sub Invoker"
gcloud run services add-iam-policy-binding telegram-pubsub \
--member=serviceAccount:cloud-run-pubsub-invoker@telefonica-solution.iam.gserviceaccount.com \
--role=roles/run.invoker
gcloud projects add-iam-policy-binding telefonica-solution \
   --member=serviceAccount:service-658693011498@gcp-sa-pubsub.iam.gserviceaccount.com \
   --role=roles/iam.serviceAccountTokenCreator
gcloud pubsub subscriptions create myTelegramRunSubscription --topic myTelegramRunTopicRunTopic \
--ack-deadline=600 \
--push-endpoint=SERVICE-URL/ \
--push-auth-service-account=cloud-run-pubsub-invoker@telefonica-solution.iam.gserviceaccount.com
