# Web Server for getset CLI tool
### A simple node.js server to provide endpoints to the getset CLI Tool.
### Note: Find the CLI tool here: [CLI](https://github.com/krnblni/getset-simple-cli)
---

[![PR](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/krnblni/getset-simple-cli)
[![GitLicense](https://gitlicense.com/badge/krnblni/getset-simple-cli)](https://github.com/krnblni/getset-simple-cli)

## Quick Start
``` bash
# Clone this repository
git clone https://github.com/krnblni/getset-web-server

# Change directory
cd getset-web-server

# Ensuring docker is logged in
docker login

# Build Docker image
docker build -t getset-docker-server

# Run docker image server
docker run -d -p 3000:9000 getset-docker-server
```

## App Info

### Author

Karan Balani
[krnblni](https://github.com/krnblni)

### Version

1.0.0

### License

This project is licensed under the MIT License
