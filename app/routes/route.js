const gs =require("../controllers/googleservice.js");
const adminController =require("../controllers/adminController.js");


exports.processEmailAndData = (req, res, next) => {
    // Call the SendingEmailService middleware first
    gs.SendingEmailService(req, res, (err) => {
      if (err) {
        return next(err);
      }
      // After emails are sent, call UserJoin middleware
      adminController.UserJoin(req, res, (err) => {
        if (err) {
          return next(err);
        }
        // After UserJoin is completed, call ProtectedAdminPage middleware
        adminController.ProtectedAdminPage(req, res);
      });
    });
  };