const Doctors = require("../models/userModels")


// all doctor list models
const AllDcotorsController = async (req, res) =>{
    const doctors = await Doctors.find({role: "doctor"})

    res.json(doctors);
}


// all requested doctors
const AllRequestedDcotorsController = async (req, res) =>{
    const doctors = await Doctors.find({role: "doctor", status: "pending"})

    res.json(doctors);
}


// all registered doctors
const AllRegisteredDcotorsController = async (req, res) =>{
    const doctors = await Doctors.find({role: "doctor", status: "accepted"});

    res.json(doctors);
}

module.exports = {AllDcotorsController,AllRequestedDcotorsController, AllRegisteredDcotorsController};