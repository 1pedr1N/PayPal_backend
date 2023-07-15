const connection = require('./connection');
const jwt = require('jsonwebtoken');

const getUserInfo = async (email) => {
    const [result] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
        );
    return result;
    }

const createUser = async (first_name, last_name,email, phone_number, address_line_1,address_line_2,state_or_province,zip_or_postal_code, country, password) => {
    const [result] = await connection.execute(
        'INSERT INTO users (first_name, last_name, email, phone_number, address_line_1,address_line_2,state_or_province,zip_or_postal_code, country, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [first_name, last_name,email, phone_number, address_line_1,address_line_2,state_or_province,zip_or_postal_code, country, password]
        );

    return result;
    }
const updateUser = async (first_name, last_name, phone_number, address_line_1,address_line_2,state_or_province,zip_or_postal_code, country, password,email) => {
 const [result] = await connection.execute(
    'UPDATE users SET first_name = ?, last_name = ?, phone_number = ?, address_line_1 = ?, address_line_2 = ?, state_or_province = ?, zip_or_postal_code = ?,country = ?,  password = ? WHERE email = ?;',
        [first_name, last_name, phone_number, address_line_1,address_line_2,state_or_province,zip_or_postal_code, country, password, email]
        );
return result;
    }
const auth = async (email, password) => {
        const [result] = await connection.execute(
          'SELECT * FROM users WHERE email = ? AND password = ?',
          [email, password]
        );
        if (result.length > 0) {
          const token = jwt.sign({ email }, 'seuSegredo');
      
          return token;
        } else {
          throw new Error('Credenciais inválidas');
        }
      };



module.exports = {
    createUser,
    auth,
    updateUser,
    getUserInfo,
    };
