import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Productos",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "Usuarios",
    },
    status: {
      type: String,
      default: "No Procesado",
      enum: ["No Procesado", "Procesando", "Enviado", "Entregado", "Cancelar"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ordenes", orderSchema);