#! /bin/sh

docker build -t agiledpl/multi-client:latest -t agiledpl/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t agiledpl/multi-server:latest -t agiledpl/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t agiledpl/multi-worker:latest -t agiledpl/multi-worker:$SHA -f ./worker/Dockerfile ./worker
docker push agiledpl/multi-client:latest
docker push agiledpl/multi-server:latest
docker push agiledpl/multi-worker:latest
docker push agiledpl/multi-client:$SHA
docker push agiledpl/multi-server:$SHA
docker push agiledpl/multi-worker:$SHA
kubectl apply -f k8s
kubectl set image deployments/client-deployment client=agiledpl/multi-client:$SHA
kubectl set image deployments/server-deployment server=agiledpl/multi-server:$SHA
kubectl set image deployments/worker-deployment worker=agiledpl/multi-worker:$SHA
