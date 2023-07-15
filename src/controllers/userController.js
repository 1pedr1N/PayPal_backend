const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const paypal = require('paypal-rest-sdk');
paypal.configure({
    mode: 'sandbox', 
    client_id: 'AQr5Q2N_DlhfJGDh3HZ4nhFVGg-RM4ssxMDjyM4wcxj3mmU0bV_rp_ZbTKaDyfOlzo56sVXIZfi3J4yJ',
    client_secret: 'EOHgRuk0UQPwhMkT822rH4zOn3FemwlLqXivpoFS5c1Luvkrx78m3dDMjTZqigGhLpEuy-wZo7uIoR_c'
  });

  const getUserInfo = async (req, res) => {
    try {
        const { email } = req.params;
        const result = await userModel.getUserInfo(email);
        res.status(200).json(result);
        } catch (error) {
            console.error(error, "error msg");
            res.status(500).json({ message: 'Internal Server Error' });
            }
    };

    const createPayment = async (req, res) => {
      try {
        const payment = {
          "intent": "sale",
          payer: {
            payment_method: 'paypal'
          },
          redirect_urls: {
            return_url: 'http://localhost:3000/sucesso',
            cancel_url: 'http://localhost:3000/cancelar'
          },
          transactions: [
            {
              amount: {
                total: '10.00',
                currency: 'USD'
              },
              description: 'Descrição do pagamento'
            }
          ]
        };
    
        paypal.payment.create(payment, (error, payment) => {
          if (error) {
            console.error(error);
            res.redirect('/erro');
          } else {
            const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
            res.redirect(approvalUrl);
          }
        });
      } catch (error) {
        console.error(error, "error msg");
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };
    

    
const create = async (req, res) => {
   try{
    const { first_name, last_name,email, phone_number, address_line1,address_line2,state_or_province,zip_or_postal_code, country, password } = req.body;

    const firstName = first_name ? first_name : null;
    const lastName = last_name ? last_name : null;
    const userEmail = email ? email : null;
    const phoneNumber = phone_number ? phone_number : null;
    const addressLine1 = address_line1 ? address_line1 : null;
    const addressLine2 = address_line2 ? address_line2 : null;
    const stateOrProvince = state_or_province ? state_or_province : null;
    const zipOrPostalCode = zip_or_postal_code ? zip_or_postal_code : null;
    const userCountry = country ? country : null;
    const userPassword = password ? password : null;

    const result = await userModel.createUser(firstName, lastName, userEmail, phoneNumber, addressLine1,addressLine2,stateOrProvince,zipOrPostalCode, userCountry, userPassword);
    res.status(201).json(result);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
   }
    }

    const update = async (req, res) => {
        try{
            const { first_name, last_name,email, phone_number, address_line1,address_line2,state_or_province,zip_or_postal_code, country, password,  } = req.body;
            const firstName = first_name ? first_name : null;
            const lastName = last_name ? last_name : null;
            const userEmail = email ? email : null;
            const phoneNumber = phone_number ? phone_number : null;
            const addressLine1 = address_line1 ? address_line1 : null;
            const addressLine2 = address_line2 ? address_line2 : null;
            const stateOrProvince = state_or_province ? state_or_province : null;   
            const zipOrPostalCode = zip_or_postal_code ? zip_or_postal_code : null;
            const userCountry = country ? country : null;
            const userPassword = password ? password : null;
            const result = await userModel.updateUser(firstName, lastName, userEmail, phoneNumber, addressLine1,addressLine2,stateOrProvince,zipOrPostalCode, userCountry, userPassword, );
            res.status(200).json(result);
            }catch(error){
                console.log(error);
                res.status(500).json({message: "Internal Server Error"});
              }
        }
        const authUser = async (req, res) => {
            try {
              const { email, password } = req.body;
              const userEmail = email ? email : null;
              const userPassword = password ? password : null;
              const result = await userModel.auth(userEmail, userPassword);
          
              if (result) {
                const token = jwt.sign({ email: userEmail }, 'seuSegredo');
          
                res.status(200).json({ token });
              } else {
                res.status(401).json({ message: 'Falha na autenticação' });
              }
            } catch (error) {
              console.log(error);
              res.status(500).json({ message: 'Internal Server Error' });
            }
          };


module.exports = {
    create,
    update,
    authUser,
    createPayment,
    getUserInfo
    };
