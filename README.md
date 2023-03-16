==================
complexity-example
==================

An example of a Complexity site. 

Clone this and use it with the Complexity static site generator: https://github.com/audreyr/complexity

Try it out::

    $ pip install complexity
    $ git clone git@github.com:audreyr/complexity-example.git my_proj
    $ cd my_proj
    $ complexity --noserver project/

python3 -m http.server --directory www/ 8080

Once you've done that, open a web browser to http://127.0.0.1:9090 to see the
newly generated Complexity static site.

```
my_repo/
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
└── www/          <---------- output
    ├── index.html
    ├── about/
    │   └── index.html
    ├── css/
    ├── js/
    └── img/
```


```
usage: complexity [-h] [--port PORT] [--noserver] project_dir

A refreshingly simple static site generator, for thosewho like to work in HTML.

positional arguments:
  project_dir  Your project directory containing the files to be processed byComplexity.

options:
  -h, --help   show this help message and exit
  --port PORT  Port number to serve files on.
  --noserver   Don't run the server.
  ```
