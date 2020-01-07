const request = require('request')

const forecast = (latitude, longitude, placeName, callback) => {
    const url='https://api.darksky.net/forecast/2bf4f820058c4ff16ae6636d6a89b967/' + encodeURIComponent(latitude) + ','+ encodeURIComponent(longitude) +'?units=si'
    request({url, json: true}, (error, {body})=>{
            if(error){
                callback('unable connect to the weather service!', undefined)
            }else if(body.error){
                        callback('unable find the given location, try with other search terms', undefined)
                    }else{
                            data = {
                                temperature:'The temperature in ' + placeName + ' is ' +body.currently.temperature+ '.',
                                rainChance:'The percentage of rainChance today here is '+body.currently.precipProbability+'%',
                                summary:'atmosphere description: ' + body.currently.summary
                            }
                            callback(undefined, data)
                        }
        })
}

module.exports = forecast