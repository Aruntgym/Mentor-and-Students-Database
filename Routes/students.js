import express from "express";
import { deletStudent, editStudent, getAllStudent, getStudentById, postNewStudent } from "../Controllers/students.js";

//Initializing the routes
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const students = await getAllStudent(req);
    if (students.length === 0) {
      return res
      .status(400)
      .json({ message: "No data available" });
    }
    res
    .status(200)
     .json({ data: students });
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
        const student = await getStudentById(id);
        if(!student) {
          return res.status(400).json({message:"No data available"})
        }
        return res.status(200).json({data: student})
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
    const newStudent = req.body
    console.log(newStudent);
    if(!newStudent){
      return res.status(400).json({meesage:"No data provided"})
    }
    const result = await postNewStudent(newStudent);
    if(!result.acknowledged) {
      return res.status(400).json({message:"Error posting data"})
    }

    res.status(201).json({data:newStudent, status:result})
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
    const updatedStudents = req.body
    if(!id || !updatedStudents) {
      return res.status(400).json({message:"Wrong Request"})
    }
    const result = await editStudent(id, updatedStudents);
    if(!result.lastErrorObject.updatedExisting){
      return res.status(400).json({meesage:"Error editing data"})
    }
    return res.status(200).json({data:updatedStudents, status:result})
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

    const result = await deletStudent(id);
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

export const studentRouter = router;
