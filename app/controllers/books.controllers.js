const ContactService = require("../services/books.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.create = (req, res) => {
    res.send({ message: "create handler" });
};

exports.findAll = (req, res) => {
    res.send({ message: "findAll handler" });
};

exports.findOne = (req, res) => {
    res.send({ message: "findOne handler" });
};

exports.update = (req, res) => {
    res.send({ message: "update handler" });
};

exports.delete = (req, res) => {
    res.send({ message: "delete handler" });
};

exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler" });
};

exports.findAllFavorite = (req, res) => {
    res.send({ message: "findAllFavorite handler" });
};

//create and save a new contact
exports.create = async (req, res, next) => {
    if (!req.body?.tensach) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {

        const contactService = new ContactService(MongoDB.client);
        // Tạo một tài liệu mới với các trường name, username và password
        const exitstingUser = await contactService.findOne({ tensach: req.body.tensach })
        if (exitstingUser) {
            res.send("book already exists.");
        }
        else {
            const document = await contactService.create({
                masach: req.body.masach,
                tensach: req.body.tensach,
                dongia: req.body.dongia,
                soquyen: req.body.soquyen,
                namxuatban: req.body.namxuatban,
                manxb: req.body.manxb,
                tacgia: req.body.tacgia,
                avatar: req.body.avatar,
            });
            return res.send(document);
        }
    } catch (error) {
        console.error("Error in create method:", error);
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.create = async (req, res, next) => {
    if (!req.body?.tensach) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {

        const contactService = new ContactService(MongoDB.client);
        // Tạo một tài liệu mới với các trường name, username và password
        const exitstingUser = await contactService.findOne({ tensach: req.body.tensach })
        if (exitstingUser) {
            res.send("book already exists.");
        }
        else {
            const document = await contactService.create({
                masach: req.body.masach,
                tensach: req.body.tensach,
                dongia: req.body.dongia,
                soquyen: req.body.soquyen,
                namxuatban: req.body.namxuatban,
                manxb: req.body.manxb,
                tacgia: req.body.tacgia,
               avatar: req.body.avatar,
            });
            return res.send(document);
        }
    } catch (error) {
        console.error("Error in create method:", error);
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

// Retrieve all contacts of a user from the database
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
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }

    return res.send(documents);
};

// Find a single contact with an id
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
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};


// Update a contact by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error updating contact with id=${req.params.id}`
            )
        );
    }
};

// Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete contact with id=${req.params.id}`
            )
        );
    }
};

exports.findAllFavorite = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving favorite contacts"
            )
        );
    }
};

// Delete all contacts of a user from the database
exports.deleteAll = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};
exports.checkLogIn = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);

        // Tìm người dùng dựa trên tên người dùng
        const user = await contactService.findOne({ username: req.body.username });

        // Kiểm tra xem người dùng có tồn tại và mật khẩu có khớp không
        if (user && user.password === req.body.password) {
            return res.status(200).send({ message: "Login successful" });
        } else {
            return res.status(401).send({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error("Error in checkLogIn method:", error);
        return next(new ApiError(500, "An error occurred while checking login"));
    }
};

