const { ObjectId } = require("mongodb");

class TheoDoiService {
    constructor(client){
        this.Contact = client.db().collection("theodoi");
     
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractContactData(payload) {
        const contact = {
            madocgia: payload.madocgia,
            masach: payload.masach,
            // dongia: payload.dongia,
            // soquyen: payload.soquyen,
            // namxuatban: payload.namxuatban,
            // manxb: payload.manxb,
            // tacgia: payload.tacgia,
            ngaymuon: payload.ngaymuon,
            ngaytra: payload.ngaytra,
        };
        //Remove undefined fields
        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }

    async create(payload) {
        const contact = this.extractContactData(payload);
        const result = await this.Contact.insertOne(contact)
            // contact,
            // {$set: { favorite: contact.favorite === true}},
            // { returnDocument: "after", upsert: true }
        const insertedContact = await this.Contact.findOne({ _id: result.insertedId });

        return insertedContact;
    }
    //

    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(new RegExp(name)), $option: { i }},
        });
    }
    //

    //
    async findById(id) {
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    //
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
           filter,
           { $set: update} ,
           {returnDocument: "after"}
        );
        return result;
    }
    //
    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
//
    async findFavorite() {
        return await this.find({ favorite: true});
    }

    //
    async deleteAll(){
        const result = await this.Contact.deleteMany({});
        return result.deleteCount;
    }

    async findOne(filter) {
        return await this.Contact.findOne(filter);
    }
}

module.exports = TheoDoiService;