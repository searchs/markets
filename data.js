const elasticsearch = require('elasticsearch');

//instantiate Elastic client
const client = new elasticsearch.Client({
    hosts: ['localhost:9200']
});

client.ping({
    requestTimeout: 20000,
}, function(error){
if(error) {
    console.error("Elasticsearch cluster is down!");
}else {
    console.log("Elasticsearch is running on http://localhost:9200/");
}
});

//create index - called shoes
client.indices.create({
index: 'shoes'
}, function(error, response, status) {
    if(error) {
        console.log(error);
    } else {
        console.log("Created new index", response);
    }
});