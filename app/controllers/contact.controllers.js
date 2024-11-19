
     
    const ContactService = require("../services/contact.service");
    const MongoDB = require("../utils/mongodb.util");
    const ApiError = require("../api-error");




// exports.create = (req, res) =>{
//     res.send({ message: "create handler"});

// exports.create = (req, res) => {
//     res.send({ message: "create handler" });
// };

// exports.findAll = (req, res) => {
//     res.send({ message: "findAll handler" });
// };

// exports.findOne = (req, res) => {
//     res.send({ message: "findOne handler" });
// };

// exports.update = (req, res) => {
//     res.send({ message: "update handler" });
// };

// exports.delete = (req, res) => {
//     res.send({ message: "delete handler" });
// };

// exports.deleteAll = (req, res) => {
//     res.send({ message: "deleteAll handler" });
// };

// exports.findAllFavorite = (req, res) => {
//     res.send({ message: "findAllFavorite handler" });
// };

// };




// Create and Save a new Contact
exports.create = async (req, res, next ) => {
    if (!req.body?.username) {
        return next(new ApiError(400, "Name can not be empty"));

    }

    try {
        const contactService = new ContactService(MongoDB.client);
       // Tạo một tài liệu mới với các trường name, username và password
        const exitstingUser = await contactService.findOne({ username: req.body.username});
        if (exitstingUser) {
            res.send(" User already");
        }else {
            const document = await contactService.create({
                username: req.body.username,
                password: req.body.password,
                ten: req.body.ten,
                holot:req.body.holot,
                ngaysinh: req.body.ngaysinh,
                sex: req.body.sex,
                diachi:req.body.diachi,
                sdt:req.body.sdt,
                nhanvien:req.body.nhanvien,
            });
            return res.send(document);
        }

        
    } catch (error){
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};



//


//Retrieve al contacts of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Am error occurred while retrieving contacts")
        );
    };
    return res.send(documents);

};
//


//Find a singsing contact with an id
exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                 500, `Error retrieving contact with id=${req.params.id}`
             )
        );
    }
};

// exports.findOne = (req, res) =>{
//     res.send({ message: "findOne handler"});
// };

// exports.update = (req, res) =>{reg
//     res.send({ message: "update handler"});
// };

//update
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const contactService =new ContactService(MongoDB.client);
        const documnet = await contactService.update(req.params.id, req.body);
        if (!documnet) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated successfully"});
    } catch (error) {
        return next (
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};



// exports.delete = (req, res) =>{
//     res.send({ message: "delete handler"});
// };

//delete a contact with the specified id in the request
exports.delete = async (req, res, next ) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, " Contact not found"));
        }
        return res.send({ message: "Contact was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError( 500, `Coild not delete contact with id=${req.params.id}`)
        );
    }
};



// exports.deleteAll = (req, res) =>{
//     res.send({ message: "deleteAll handler"});
// };
//Delete all contacts of a user from the database
exports.deleteAll = async (_req, res, next ) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.delete();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};


// exports.findAllFavorite = (req, res) =>{
//     res.send({ message: "findAllFavorite handler"});
// };

//Find all favorite contacts of a user
exports.findAllFavorite = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving favorite contacts")
        );
    }
};

exports.checkLogIn = async (req, res, next) => {
    try {
        const user = req.body;
        const username = user.username
        console.log(username)
        const contactService = new ContactService(MongoDB.client);
        //Tìm người dựa trên trên
        const exitUser = await contactService.find({username });
        console.log("exit", exitUser)
        console.log(exitUser[0].password, user.password)
        //kiểm tra tài khoản có tồn tại và password có khớp
        if (exitUser[0].password === user.password){
            return res.status(200).send({ message: "Login thanh cong!"});
        } else {
            return res.status(401).send({ message: "Loi username hoac password"});
        }
    } catch (error) {
        console.error("Loi trong checkLogin:", error);
        return next(new ApiError(500, "Xay ra Loi khi CheckLogin"))
    }
};


