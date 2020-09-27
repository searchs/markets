const elasticsearch = require('elasticsearch');

//instantiate Elastic client
const client = new elasticsearch.Client({
    hosts: ['es01:9200','es02:9200','es03:9200']
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