import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productos: [
      {
        type: mongoose.ObjectId,
        ref: "Producto",
      },
    ],
    pago: {},
    comprador: {
      type: mongoose.ObjectId,
      ref: "Usuarios",
    },
    estado: {
      type: String,
      default: "NO PROCESADO",
      enum: ["NO PROCESADO", "PROCESANDO", "ENVIADO", "ENTREGADO", "CANCELADO"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ordenes", orderSchema);