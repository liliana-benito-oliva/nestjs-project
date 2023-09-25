# Installing and running the app

```bash
$ npm i

$ npm run build

# raises elasticSearchNode and nest api on ports 9200 and 3000 respectively
$ docker-compose up

```

## Testing the app

Make sure that the elasticsearch docker is up and runing before making requests
you can do so with a simple check for indices

# postman cURL
curl --location 'http://localhost:9200/_cat/indices?v'

The uri http://localhost:3000/api#/ exposes a swagger to test all of the functions of the API,
however it does not offer great file support, for this reason you can execute the post to 
upload any file with the following curl using your own file (the file in question is in uploads, 
but any csv with this template will work)

# postman cURL
curl --location 'http://localhost:3000/files' \
--form 'csv=@"${fileName}"'

# Some Added functionality
appart from aveerage, median and top salaries, the same queries are available with gender filtering,
the field CARGO can be used as a filter in get