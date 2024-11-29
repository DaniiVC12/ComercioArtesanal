import { comparePassword, hashPassword } from "./../ayudas/authHelper.js";
import usuarioModel from "../models/usuarioModel.js";
import JWT from "jsonwebtoken";

/* 
Seguridad y e implementacion BD

Función de hash que asegura las contraseñas antes de guardarlas en la base de datos.
Verificaciones para que todos los campos requeridos estén presentes y sean válidos. */


export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address, answer} = req.body;
        
        //validaciones
        if(!name) {
            return res.send({error: "NECESITA INGRESAR EL NOMBRE"});
        }
        if(!email) {
            return res.send({message: "INGRESE EL CORREO ELECTRONICO"});
        }
        if(!password) {
            return res.send({message: "NECESITA INGRESAR UNA CONTRASEÑA"});
        }
        if(!phone) {
            return res.send({message: "PROPORCIONE EL NUMERO DE TELEFONO"});
        }
        if(!address) {
            return res.send({message: "INGRESE SU DIRECCION"});
        }
        if(!answer) {
          return res.send({message: "SE NECESITA CONTESTAR A LA PREGUNTA POR SEGURIDAD"});
      }

        //verificar si hay usuario
        const existingUser = await usuarioModel.findOne({email});

        //usuario existente
        if(existingUser) {
            return res.status(200).send({
                success:false,
                message:"EL USUARIO YA ESTA REGISTRADO, INICIE SESION",

            });
        }


        //registrar usuario
        const hashedPassword = await hashPassword(password);
        //guardarlo
        const user = await new usuarioModel({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
        answer
      }).save();


      res.status(201).send({
        success: true,
        message: "USUARIO REGISTRADO CORRECTAMENTE",
        user,
      });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"ERROR, NO SE PUDO REGISTRAR",
            error
        })
    }
};


/*
 Generamos y utilizamos tokens JWT(JSON) para autenticar a los usuarios después de que se loguean
 correctamente.
*/

//POST LOGIN
export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      //validacion
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "CORREO O CONTRASEÑA NO VALIDOS",
        });
      }
      //check user
      const user = await usuarioModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "EL CORREO NO ESTA REGISTRADO",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "CONTRASEÑA NO VALIDA",
        });
      }
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "SE HA LOGEADO",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "ERROR EN EL LOGIN",
        error,
      });
    }
  };


  export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
  
      // Validaciones
      if (!email) {
        return res.status(400).send({ message: "SE NECESITA EL CORREO ELECTRONICO" });
      }
      if (!answer) {
        return res.status(400).send({ message: "SE NECESITA UNA RESPUESTA" });
      }
      if (!newPassword) {
        return res.status(400).send({ message: "ES NECESARIA UNA NUEVA CONTRASEÑA" });
      }
  
      // Verificar el usuario
      const user = await usuarioModel.findOne({ email, answer });
      
      // Validación del usuario
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "EL CORREO O LA RESPUESTA NO SON CORRECTOS",
        });
      }
  
      // Cambiar la contraseña
      const hashed = await hashPassword(newPassword);
      await usuarioModel.findByIdAndUpdate(user._id, { password: hashed });
  
      return res.status(200).send({
        success: true,
        message: "SE CAMBIO LA CONTRASEÑA CORRECTAMENTE",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "ALGO SALIO MAL",
        error,
      });
    }
  };

  //test controller
export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };