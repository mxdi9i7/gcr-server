import openHouseDates from '../database/model/openHouseDates'

function createOHD(req, res) {
    console.log("coming createOHD");
    const opd = new openHouseDates({
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        property_id: req.body.property_id,
        
    });
    console.log(opd);
    opd.save((err, docs) => {
        if (err) {
            console.log("1");
            res.json({
                success: false,
                message: err
            });
        } else {
            console.log("2");
            res.json({
                success: true,
                message: {
                    _id: docs._id,
                    docs
                }
            });
        }
    });
}

function deleteOHD(req, res) {
    console.log("coming deleteOHD");
    var property_id = req.body.property_id;
    console.log(property_id);
    openHouseDates.remove({'property_id': property_id}).exec((err,data)=>{
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json(data);
        }
    })
}

function updateOHD(req, res) {
    console.log("coming updateOHD");
    var conditions = {property_id : req.body.property_id};
    var update     = {$set : {start_time:start_time,end_time:end_time}};
    var options    = {upsert : false};
   
    openHouseDates.update(conditions, update, options, function(error,data){
        if(error) {
            console.log(error);
            res.status(500).send(error)
        } else {
            console.log('update ok!');
            res.status(200);
        }
              
    });
}

function queryOHD(req, res) {
    console.log("coming queryOHD");
    var property_id = req.body.property_id;
    Users.find({property_id: property_id}).exec((data)=>{
      res.json(data)
    })
}




export { createOHD,deleteOHD,updateOHD,queryOHD };