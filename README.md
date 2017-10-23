# Gladius node software
Node software for the Gladius network

## Running
- Make sure you have docker and docker-compose installed.
- Run `docker-compose up -d --build` in the source directory.

This should build the interface and proxy/cache service.

## Connecting to a pool
- Once the app has started, connect to localhost:3000 in your web browser. 
- Request to join a pool by clicking "Request to join pool" with the address of your desired pool.
- Once you have been accepted, click "Get IP" and set "BACKENDS" to it in the "docker-compose.yml"
- Forward port 80 on your router to the computer running the node software.

## Missing features
- No way to limit bandwidth. It would not be recommended to participate in a pool without a suitable internet connection.
- Only one site at a time.
- Restricted to HTTP traffic only (can be implemented by adding an NGINX container, but requires all nodes possess certs)