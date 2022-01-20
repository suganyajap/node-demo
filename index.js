// const { response } = require("express");
// const express=require("express");
import express, { request, response } from "express";
import {  MongoClient } from "mongodb";
import { getMovies, getMovieById, updateMovieById, deleteMovieById, createMovies } from "./helper.js";
const app=express();
const PORT=9000;
 app.use(express.json());
const MONGO_URL="mongodb://localhost";
async function createConnection(){
    const client=new MongoClient(MONGO_URL);
     await client.connect();
    console.log("MongoDB connected");
    return client;
}
export const client= await createConnection();

app.get("/",(request,response)=>{
 response.send("Hello World!!!");
});

app.get("/movies",async (request,response)=>{
    console.log(request.query);
    const filter=request.query;
    console.log(filter);
    if(filter.rating){
        filter.rating=+filter.rating;
    }
    const movie= await getMovies(filter);
    response.send(movie);
})
app.get("/movies/:id",async (request,response)=>{
    console.log(request.params);
    const { id }=request.params;
    const movie = await getMovieById(id);
    console.log(movie);
    movie ? response.send(movie)
          : response.status(404).send({message:"Not matching found"})
});
app.put("/movies/:id", async (request,response)=>{
    console.log(request.params);
    const { id }=request.params;
    const data = request.body;
    const result = await updateMovieById(id, data);
    const movie = await getMovieById(id);
    response.send(movie);
})
app.delete("/movies/:id", async (request,response)=>{
    console.log(request.params);
    const { id } = request.params;
    const result = await deleteMovieById(id);
    result.deletedCount > 0
    ? response.send(result)
    : response.status(404).send({message:"No matching movie found"});
});

app.post("/movies",async (request,response)=>{
    const data=request.body;
    const result= await createMovies(data);
            response.send(result);
});





app.listen(PORT,()=>console.log("App is started in",PORT));


