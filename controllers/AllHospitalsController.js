const User = require("../models/userModels");


// all hospital list models
const AllHospitalsController =async (req, res) =>{
    const allHospital = await User.find({role: "hospital"})

    res.json(allHospital)
}


// all requested hospital
const AllRequestedHospitalsController = async (req, res) =>{
    const allHospital = await User.find({role: "hospital", status: "pending"})

    res.json(allHospital);
}


// all registered hospital
const AllRegisteredHospitalsController = async (req, res) =>{
    const allHospital = await User.find({role: "hospital", status: "accepted"});

    res.json(allHospital);
}

module.exports = { AllHospitalsController, AllRequestedHospitalsController, AllRegisteredHospitalsController};