import Product from '../models/productModel.js';
import Image from '../models/imageModel.js';
// Establecer la relación: un producto tiene muchas imágenes
Product.hasMany(Image, { foreignKey: 'id_producto' });
Image.belongsTo(Product, { foreignKey: 'id_producto' });