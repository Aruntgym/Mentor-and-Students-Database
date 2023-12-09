import express from "express";
import { deletMentor, editMentor, getAllMentor, getMentorById, postNewMentor } from "../Controllers/mentors.js";

//Initializing the routes
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const mentors = await getAllMentor(req);
    if (mentors.length === 0) {
      return res
      .status(400)
      .json({ message: "No data available" });
    }
    res
    .status(200)
     .json({ data: mentors });
  } catch (error) {
    console.log(error);
    res
    .status(500)
    .json({ message: "Internal server error" });
  }
});

router.get("/all/:id", async (req, res)=>{
    try {
        const {id} = req.params;
        const mentor = await getMentorById(id);
        if(!mentor) {
          return res.status(400).json({message:"No data available"})
        }
        return res.status(200).json({data: mentor})
    } catch (error) {
      console.log(error);
      res
      .status(500)
      .json({ message: "Internal server error" });
    }
})

// adding new student
router.post("/add", async(req, res) => {
  try {
    const newMentor = req.body
    console.log(newMentor);
    if(!newMentor){
      return res.status(400).json({meesage:"No data provided"})
    }
    const result = await postNewMentor(newMentor);
    if(!result.acknowledged) {
      return res.status(400).json({message:"Error posting data"})
    }

    res.status(201).json({data:newMentor, status:result})
  } catch (error) {
    console.log(error);
      res
      .status(500)
      .json({ message: "Internal server error" });
  }
})

router.put("/edit/:id", async(req, res)=>{
  try {
    const {id} = req.params;
    const updatedMentors = req.body
    if(!id || !updatedMentors) {
      return res.status(400).json({message:"Wrong Request"})
    }
    const result = await editMentor(id, updatedMentors);
    if(!result.lastErrorObject.updatedExisting){
      return res.status(400).json({meesage:"Error editing data"})
    }
    return res.status(200).json({data:updatedMentors, status:result})
  } catch (error) {
    console.log(error);
      res
      .status(500)
      .json({ meesage: "Internal server error" });
  }
})


router.delete("/delete/:id", async(req, res)=>{
  try {
    const {id} = req.params;
    if(!id){
      return res.status(400).json({message:"Wrong Request"})
    }

    const result = await deletMentor(id);
    if(result.deletedCount<=0){
      return res.status(400).json({meesage:"Error deleting data"})
    }
    return res.status(200).json({data:result})
  } catch (error) {
    console.log(error);
      res
      .status(500)
      .json({ meesage: "Internal server error" });
  }
})

export const mentorRouter = router;
