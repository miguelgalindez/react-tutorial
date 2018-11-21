const express=require('express')
const graphqlHTTP=require('express-graphql')
const app=express()
const schema=require('./schema/schema')
const mongoose=require('mongoose')

mongoose.connect('mongodb://miguel:miguel123@ds039007.mlab.com:39007/graphql-miguelgalindez', { useNewUrlParser: true }).catch(console.error)
mongoose.connection.once('connected', ()=> console.log('Connected to DB'))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, ()=>console.log('Running on port 4000'))