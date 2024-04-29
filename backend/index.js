import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import verifyToken from './middleware/auth.js';
dotenv.config();

// Abrir la base de datos SQLite
async function openDb() {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  });
}

const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
app.use(cors());
app.use(express.json());

// Ruta para crear la tabla Usuarios (Se ejecuta solo una vez): http://localhost:5000/setup En caso de ejecutarla más de una vez, se mostrará un error de tabla ya existente
app.get('/setup', async (req, res) => {
  const db = await openDb();
  await db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT)');
  res.send('Tabla creada');
});

// En caso de que se quiera borrar la tabla Usuarios: http://localhost:5000/delete
app.get('/delete', async (req, res) => {
  const db = await openDb();
  await db.exec('DROP TABLE IF EXISTS users');
  res.send('Tabla eliminada');
});

// Ruta de registro de usuarios: http://localhost:5000/register
// Se debe enviar un objeto JSON con la estructura { "email": "usuario", "password": "contraseña" }
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const db = await openDb();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).send('Usuario registrado con éxito');
  } catch (error) {
    res.status(500).send('Error registrando el usuario: ' + error.message);
  }
});


// Ruta de autenticación de usuarios: http://localhost:5000/login
// Se debe enviar un objeto JSON con la estructura { "email": "usuario", "password": "contraseña" }
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const db = await openDb();
  try {
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    console.log(user);
    console.log(JWT_SECRET)
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ token });
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  } catch (error) {
    res.status(500).send('Error en la autenticación: ' + error.message);
  }
});

// Ruta para obtener productos desde un servicio externo: http://localhost:5000/products
// Se debe enviar el token JWT en el header de la petición: authorization Bearer <token>
app.get('/products', verifyToken, async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error al recuperar productos: ' + error.message);
  }
});

// Ruta para filtrar productos por rango de precios: http://localhost:5000/filtered-products?minPrice=100&maxPrice=500
// Se debe enviar el token JWT en el header de la petición: Authorization Bearer <token>
app.get('/filtered-products', verifyToken, async (req, res) => {
  try {
      const response = await axios.get('https://dummyjson.com/carts');
      const carts = response.data.carts;

      const minPrice = parseFloat(req.query.minPrice);
      const maxPrice = parseFloat(req.query.maxPrice);

      const filteredCarts = carts.map(cart => ({
          ...cart,
          products: cart.products.filter(product => 
              product.price >= minPrice && product.price <= maxPrice
          )
      })).filter(cart => cart.products.length > 0);

      res.json(filteredCarts);
  } catch (error) {
      res.status(500).send('Error al recuperar productos: ' + error.message);
  }
});

//Buscar productos por nombre: http://localhost:5000/search?name=nombre
//Se debe enviar el token JWT en el header de la petición: Authorization Bearer <token>
app.get('/search', verifyToken, async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/carts');
    const carts = response.data.carts;
    const allProducts = carts.flatMap(cart => cart.products);

    const name = req.query.name.toLowerCase();
    console.log(name);

    const filteredProducts = allProducts.filter(product =>
      product.title.toLowerCase().includes(name)
    );

    res.json(filteredProducts);
  } catch (error) {
    res.status(500).send('Error al recuperar productos: ' + error.message);
  }
});


// Ruta de prueba para verificar que el backend está funcionando: http://localhost:5000/
app.get('/', async (req, res) => {
  res.send(`Backend funcionando en el puerto ${port}`);
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
