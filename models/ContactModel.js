const { Schema, model } = require('mongoose');
const Joi = require('joi');
const handleMongooseError = require("../helpers/handleMongooseError");

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
contactSchema.post("save", handleMongooseError);

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});
const schemaFavorite = Joi.object({
    favorite: Joi.boolean().required(),
});

const contactModel = model('Contact', contactSchema);

module.exports = {
    contactModel,
    schema,
    schemaFavorite
};