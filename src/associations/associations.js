import Product from '../models/productModel.js';
import Image from '../models/imageModel.js';
import Cart_detail from '../models/shopping_cart_detailsModel.js';

// Establecer la relación: un producto tiene muchas imágenes
Product.hasMany(Image, { 
    foreignKey: 'id_producto' 
});
Image.belongsTo(Product, {
    foreignKey: 'id_producto' 
});

// Asociación entre productos y detalles del carrito
Product.hasMany(Cart_detail, {
    foreignKey: 'id_producto',
});
Cart_detail.belongsTo(Product, {
    foreignKey: 'id_producto',
});