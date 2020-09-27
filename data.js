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
index: 'cities'
}, function(error, response, status) {
    if(error) {
        console.log(error);
    } else {
        console.log("Created new index", response);
    }
});

// add some data
client.index({
    index: 'citylist',
    id: '1',
    type: 'cities_list',
    body: {
        "key1": "Content for Key One",
        "key2": "Content for Key Two",
        "key3" : "Content for Key  Three",

    } 
}, function(err, resp, status) {
    console.log(resp);
});


// ingest data in volumes
const cities = require('./cities.json');

var bulk = [];

// loop thru and insert in bulk array - ready for indexing 
cities.forEach(city => {
    bulk.push({
        index: {
            _index: "cities",
            _type: "cities_list",
        }
    })
    bulk.push(city);
})

//perform bulk indexing of the data passed
client.bulk({body: bulk}, function(err, response) {
    if(err) {
        console.log("Failed Bulk operaiton".red, err)
    } else {
        console.log("Successfully imported %s".green, cities.length);
    }
});