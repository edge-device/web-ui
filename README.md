# Polaris Web-UI

Polaris Web-UI is the user interface for the Polaris service. It run as a static website in an Nginx container and interacts with Polaris service using its APIs--an architectural pattern sometimes referred to as a Jamstack.

## Website Develop

In order to reduce code duplication and sped development, Web-UI is built using a lightweight static site generator (SSG), called [Complexity](https://github.com/audreyr/complexity) . While Complexity is unmaintained, for a simple SSG it works really well. There is a project underway to create a modern Go version, but that is currently a WIP. I have tested omplexity with Python 3.8 and it works fine.

### Complexity installation

Use the following pip command to install Complexity SSG

`>$ pip3 install complexity`

Add Complexity path to PATH in your local .bashrc using the following command:

`>$ echo "export PATH='/home/$(USER)/.local/bin:$PATH'" >> ~/.bashrc`

### Build and run the website

Complexity documentation can be found [here](https://complexity.readthedocs.io/en/latest/). In order to make things easier, make commands for build and serve have been created. To build the static site, run the following command from the project root directory:

`>$ make build`

To build and serve the website, run the command:

`>$ make run`

<strong>Note: The default port is 8080, which can be changed in the Makefile.</strong>

### Project Layout

Below is the project directory layout. Website development is done in the `/project` directory. When the site is built, the build is placed in `/www` directory. This is the folder that gets served by the Nginx web server.

```
web-ui/
├── data
│   ├── certbot
│   └── nginx
│
├── project/       <--------- input
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── img/
│   │
│   └── templates/
│       ├── base.html
│       ├── index.html
│       └── about.html
│
├── www/          <---------- output
│   ├── index.html
│   ├── about/
│   │   └── index.html
│   ├── css/
│   ├── js/
│   └── img/
```

### Deploying

This documentation assumes you have a server with Docker and Docker Compose installed. For a new deployment, the `init.sh` must be run first to setup dummy certs and prepare for certbot to obtain a signed Let's Encrypt certificate, then the Compose file can be deployed.

Deploy website using Docker Compose

`>$ sudo docker-compose up`

### Shell into Nginx container

`>$ docker exec -it web-ui_nginx_1 /bin/sh`