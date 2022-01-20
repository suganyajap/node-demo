import { client } from "./index.js";

 async function createMovies(data) {
    return await client
        .db("b28wd")
        .collection("demo")
        .insertMany(data);
}
 async function deleteMovieById(id) {
    return await client.db("b28wd").collection("demo").deleteOne({ id: id });
}
 async function updateMovieById(id, data) {
    return await client.db("b28wd").collection("demo").updateOne({ id: id }, { $set: data });
}
 async function getMovieById(id) {
    return await client.db("b28wd").collection("demo").findOne({ id: id });
}
 async function getMovies(filter) {
    return await client.db("b28wd").collection("demo").find(filter).toArray();
}
export {
    getMovies,
    createMovies,
    getMovieById,
    updateMovieById,
    deleteMovieById
}
