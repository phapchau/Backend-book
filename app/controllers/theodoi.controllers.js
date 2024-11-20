
     const ApiError = require("../api-error");
     const TheoDoiService = require("../services/theodoi.service");
     const MongoDB = require("../utils/mongodb.util");


// exports.create = (req, res) =>{
//     res.send({ message: "create handler"});
// };

// Create and Save a new Contact
exports.create = async (req, res, next ) => {
    
    try {
        const contactService = new TheoDoiService(MongoDB.client);
        // Tạo một tài liệu mới với các trường name, username và password
        const exitstingUser =await contactService.findOne({masach: req.body.masach});
        if (exitstingUser) {
            res.send("Theo doi muon sach already");
        }
        else {
            const document = await contactService.create({
                masach: req.body.masach,
                madocgia: req.body.madocgia,
                ngaymuon: req.body.ngaymuon,
                ngaytra: req.body.ngaytra,
            
            });
             return res.send(document);
        }
        // return res.send(document);
    } catch (error){
        console.error("Error in create method:",error);
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
        const contactService = new TheoDoiService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Am error occurred while retrieving contacts")
        );
    }
    return res.send(documents);

};
//


//Find a singsing contact with an id
exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Nha xuat ban not found"));
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                 500, `Error retrieving nha xuat ban with id=${req.params.id}`
             )
        );
    }
};

// exports.findOne = (req, res) =>{
//     res.send({ message: "findOne handler"});
// };

// exports.update = (req, res) =>{
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
            return next(new ApiError(404, "Nha xuat babn not found"));
        }
        return res.send({ message: "Nha xuat ban was updated successfully"});
    } catch (error) {
        console.log(error);
        return next (
            new ApiError(500, `Error updating nha xuat ban with id=${req.params.id}`)
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
            return next(new ApiError(404, " Nha xuat ban not found"));
        }
        return res.send({ message: "Nha xuat bna was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError( 500, `Could not delete nha xuat ban with id=${req.params.id}`)
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
            message: `${deletedCount} Nha xuat ban were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all nha xuat ban")
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

exports.checkLogin = async (reg, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        //Tìm người dựa trên trên
        const user = await contactService.findOne({ username: reg.body.username});
        //kiểm tra tài khoản có tồn tại và password có khớp
        if (user && user.password === reg.body.password){
            return res.status(200).send({ message: "Login thanh cong!"});
        } else {
            return res.status(401).send({ message: "Loi username hoac password"});
        }
    } catch (error) {
        console.error("Loi trong checkLogin:", error);
        return next(new ApiError(500, "Xay ra Loi khi CheckLogin"))
    }
};
