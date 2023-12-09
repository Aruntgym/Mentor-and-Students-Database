import { client } from "../db.js";
import jwt from "jsonwebtoken"

export function addUser(userData){
    return client
    .db("b43")
    .collection("users")
    .insertOne(userData)
}

export function getUser(email){
    return client
    .db("b43")
    .collection("users")
    .findOne({email:email})
}

export function generateToken(id){
    return jwt.sign(
        {id},
        process.env.SECRET_KEY,
        {expiresIn:"30d"}
    )
}