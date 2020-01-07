const request = require('request')

const geoCode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmdvcGFseWFkYXYiLCJhIjoiY2s0cGY4YW92MDU2djNucXVnMWgzano1cyJ9.R99veLM0t4Gq53owhWozow&limit=1'
    request({url, json:true}, (error, {body})=>{
           if(error){
               callback('unable to connect to the location services! ', undefined)
            }else if(body.features.length===0){
               callback('The place you are searching, is not found, and please do another search,  ', undefined)
                } else{
                        const geoCodeData={
                            latitude:body.features[0].center[1],
                            longitude:body.features[0].center[0],
                            place:body.features[0].place_name
                        }
                        callback(undefined, geoCodeData)
                    }
        })
}

module.exports = geoCode