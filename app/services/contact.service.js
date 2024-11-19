const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client){
        this.Contact = client.db().collection("account");
     
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractContactData(payload) {
        const contact = {
            username: payload.username,
            password:payload.password,
            holot:payload.holot,
            ten:payload.ten,
            ngaysinh:payload.ngaysinh,
            sex:payload.sex,
            diachi:payload.diachi,
            sdt:payload.sdt,
            nhanvien:payload.nhanvien,
            // address: payload.address,
            // phone:payload.phone,
            // favorite: payload.favorite,
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
        const insertedContact = await this.Contact.findOne({ _id: result.insertedId });

        return insertedContact;
    }
    //

    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    // async findByName(name) {
    //     console.log("aaa",name)
    //     // const nameStr = String(name);
    //     // console.log(nameStr);
    //     return await this.find({
    //      uername:"thien"
    //     });
    // }
async findByName(name) {
    // try {
    //     console.log("Searching for user:", username);
        
    //     // Adjust field name if needed
    //     const result = await this.findOne({ username: username });
        
    //     console.log("Query result:", result);
    //     return result;
    // } catch (error) {
    //     console.error("Error in findByName:", error);
    //     throw error;
    // }

     return await this.find({
            name: { $regex: new RegExp(new RegExp(name)), $options: "i" },
        });
}

    //

    //
    async findOne(id) {
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
    // async deleteAll(){
    //     const result = await this.Contact.deleteMany({});
    //     return result.deleteCount;
    // }

}

module.exports = ContactService;