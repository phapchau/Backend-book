
     
    const DocGiaService = require("../services/docgia.service");
    const MongoDB = require("../utils/mongodb.util");
    const ApiError = require("../api-error");

// exports.create = (req, res) =>{
//     res.send({ message: "create handler"});
// };

// Create and Save a new Contact
exports.create = async (req, res, next ) => {
    if (!req.body?.tendocgia) {
        return next(new ApiError(400, "Name can not be empty"));

    }

    try {
        const contactService = new DocGiaService(MongoDB.client);
        // Tạo một tài liệu mới với các trường name, username và password
        const exitstingUser =await contactService.findOne({tendocgia: req.body.tendocgia});
        if (exitstingUser) {
            res.send("doc gia already");
        }
        else {
            const document = await contactService.create({
                madocgia: req.body.madocgia,
                holot: req.body.holot,
                tendocgia: req.body.tendocgia,
                ngaysinh: req.body.ngaysinh,
                sex: req.body.sex,
                diachi: req.body.diachi,
                sdt: req.body.sdt,
            });
             return res.send(document);
        }
        // return res.send(document);
    } catch (error){
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while creating the doc gia")
        );
    }
};



//


//Retrieve al contacts of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new DocGiaService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Am error occurred while retrieving doc gia")
        );
    }
    return res.send(documents);

};
//


//Find a singsing contact with an id
exports.findOne = async (req, res, next) => {
    try {
        const contactService = new DocGiaService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Doc gia not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                 500, `Error retrieving doc gia with id=${req.params.id}`
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
        const contactService =new DocGiaService(MongoDB.client);
        const documnet = await contactService.update(req.params.id, req.body);
        if (!documnet) {
            return next(new ApiError(404, "Doc gia not found"));
        }
        return res.send({ message: "Doc gia was updated successfully"});
    } catch (error) {
        return next (
            new ApiError(500, `Error updating doc gia with id=${req.params.id}`)
        );
    }
};



// exports.delete = (req, res) =>{
//     res.send({ message: "delete handler"});
// };

//delete a contact with the specified id in the request
exports.delete = async (req, res, next ) => {
    try {
        const contactService = new DocGiaService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        // Nếu null tức là không tìm thấy nên không xóa được
        if (!document) {
            return next(new ApiError(404, " Doc gia not found"));
        }
        return res.send({ message: "Doc gia was deleted successfully"});
    } catch (error) {
        console.log(error);
        return next(
            new ApiError( 500, `Coild not delete doc gia with id=${req.params.id}`)
        );
    }
};



// exports.deleteAll = (req, res) =>{
//     res.send({ message: "deleteAll handler"});
// };
//Delete all contacts of a user from the database
exports.deleteAll = async (_req, res, next ) => {
    try {
        const contactService = new DocGiaService(MongoDB.client);
        const deletedCount = await contactService.delete();
        return res.send({
            message: `${deletedCount} doc gia were deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while removing all doc gia")
        );
    }
};


// exports.findAllFavorite = (req, res) =>{
//     res.send({ message: "findAllFavorite handler"});
// };

//Find all favorite contacts of a user
exports.findAllFavorite = async (_req, res, next) => {
    try {
        const contactService = new DocGiaService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving favorite contacts")
        );
    }
};

exports.checkLogin = async (req, res, next) => {
    try {
        const contactService = new DocGiaService(MongoDB.client);
        //Tìm người dựa trên trên
        const user = await contactService.findOne({ username: req.body.username});
        //kiểm tra tài khoản có tồn tại và password có khớp
        if (user && user.password === req.body.password){
            return res.status(200).send({ message: "Login thanh cong!"});
        } else {
            return res.status(401).send({ message: "Loi username hoac password"});
        }
    } catch (error) {
        console.error("Loi trong checkLogin:", error);
        return next(new ApiError(500, "Xay ra Loi khi CheckLogin"))
    }
};

