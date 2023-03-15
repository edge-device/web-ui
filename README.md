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