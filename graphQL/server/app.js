const express=require('express')
const graphqlHTTP=require('express-graphql')
const app=express()
const schema=require('./schema/schema')
const mongoose=require('mongoose')
const cors=require('cors')

// Allow cross-orgin requests
app.use(cors())

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true }).catch(console.error)
mongoose.connection.once('connected', ()=> console.log('Connected to DB'))



app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, ()=>console.log('Running on port 4000'))