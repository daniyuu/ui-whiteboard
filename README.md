# Whiteboard UI

recommend use yarn or pnpm
```bash
$ yarn
$ yarn dev
$ open http://localhost:5732/
```

### docker-compose

1. docker-compose up -d


### docker build

1. On windows machine you can run  build_save.ps1 dev
   On mac or linux you can run  build_save.sh dev
2. docker load -i ./build/whiteboard-ui-dev.tgz
3. docker-compose up -d 
