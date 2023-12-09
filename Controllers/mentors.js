import { ObjectId } from "bson";
import { client } from "../db.js";

export function getAllMentor(req){
    return client
    .db("batch43")
    .collection("mentors")
    .find(req.query)
    .toArray(); 
}

export function getMentorById(id){
    return client
    .db("batch43")
    .collection("mentors")
    .findOne({_id: new ObjectId(id)})
}

export function postNewMentor(data){
    return client
    .db("batch43")
    .collection("mentors")
    .insertOne(data)
}

export function editMentor(id, data){
    return client
    .db("batch43")
    .collection("mentors")
    .findOneAndUpdate({_id: new ObjectId(id)}, {$set:data})
}

export function deletMentor(id){
   return client
   .db("batch43")
   .collection("mentors")
   .deleteOne({_id: new ObjectId(id)})
}