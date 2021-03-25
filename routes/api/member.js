const express = require("express")
const uuid = require("uuid")
const router = express.Router()
const members = require("../../Members");

//This route retrieves all members already registered
router.get("/", (req, res) => res.json(members));

//This route retrieve an specific member based on id passed by url
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

//This route is used to create a new member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  }

  if(!newMember.name || !newMember.email){
    return res.status(400).json({msg: "Please include a name and an email"})
  }
  else{
    members.push(newMember)
    res.json(members)
  }
});

router.put("/:id", (req,res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))

  if(found){
    const memberUpdate = req.body

    members.forEach((member, index) => {
      let response
      if(member.id === parseInt(req.params.id)){
        response =  {...memberUpdate}
      }
      else{
        response = {...member}
      }

      members[index] = {...response}
    }) 
    res.json(members)
  }
  else{
    res.status(400).json({msg : `ID : ${req.params.id} doesn't associate with a member!`})
  }
})

router.delete("/:id", (req,res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))

  if(found){
    const indexToDelete = members.findIndex((member, index) => member.id === parseInt(req.params.id))

    members.splice(indexToDelete, 1)
    res.json(members)
  }
  else{
    res.status(400).json({msg : `ID : ${req.params.id} doesn't associate with a member!`})
  }
})

module.exports = router