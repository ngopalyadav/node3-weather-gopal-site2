const path = require('path')
const express = require('express')
const hbs = require('hbs')

//importing weather app modules geocode fucntion and forecase function
const geoCode = require('./utils/geoCode')
const forecast= require('./utils/forecast')

const app = express()
const port=process.env.PORT || 3000

//Define paths for Express config
const pulbicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup handlebars engine and views location
app.use(express.static(pulbicDirectoryPath))

app.get('', (req, res) => {
    debugger
    res.render('index', {
        title: 'Weather',
        name: 'ngopalyadav'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'about',
        name: 'ngopalyadav'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'help',
        helpMsg:'i am here to help',
        name:'ngopalyadav'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        
        return res.send({ error: 'please provide a search term!' })
    }

    const data = geoCode(req.query.search, (error, {latitude, longitude, place} = {} ) => {
                        if(error) return res.send({error})
                        else{
                            forecast(latitude, longitude, place, (error,{temperature, rainChance, summary} = {} ) => {
                                if(error) return res.send({error})
                                else { return res.send({    title:'weather',
                                                            name: 'ngopalyadav',
                                                            temperature: temperature,
                                                            rainChance: rainChance,
                                                            summary : summary,
                                                            placeSearch: req.query.search
                                                        })
                                }
                            })
                        }
                })

    // res.send({  Temperature: 26, 
    //             rainChance: 0.03, 
    //             atmosphere: 'mostly cloudy', 
    //             place: req.query.search
    //         })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404 Page',
        errorMessage:'Error:404, help page not found!',
        name:'ngopalyadav'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title:'404 Page',
        errorMessage:'Error:404, Page not Found!',
        name:'ngopalyadav' 
    })
})

app.listen(port, () => {
    console.log('server is up on port:'+port)
})