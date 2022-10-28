## How to run the project

### Required:

node.js: v18.4

Install dependencies:

```shell
npm install
```

Now create a file called `.env` in the project root and add the following variables, replacing the values with your own.

**.env**

```bash
PORT={Port} // Default 5500
DB_URL={MongoDB URL}
```

Run the project:

```shell
npm start
```

Open Api Docs in your browser [http://localhost:PORT/api](http://localhost:5500/api)
