// You can transfer join state from usercontroller to here

exports.JoinTest = async (req,res,next)=>{


    const userwithfieldname = await User.aggregate(
      [
        {
          $lookup: {
            from: 'fields',
            localField: 'fieldId',
            foreignField: 'fieldId',
            as: 'fieldData',
          },
        },
        {
          $unwind: '$fieldData',
        },
        {
          $project: {
            _id: 1,
            name: 1,
            fieldname: '$fieldData.fieldname',
          },
        },
      ]
  
    );
  
    console.log(userwithfieldname);
    next();
  
  }



  exports.helloadmin =(req,res)=>{
    console.log("test");
  }