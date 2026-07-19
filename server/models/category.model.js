import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Category description is required']
    }
}, { timestamps: true });

const Category = model('Category', categorySchema);
export default Category;
