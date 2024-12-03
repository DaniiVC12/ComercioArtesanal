import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productos: [
      {
        type: mongoose.ObjectId,
        ref: "Productos",
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
      enum: ["NO PROCESADO", "EN PROCESO", "ENVIADO", "ENTREGADO", "CANCELAR"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ordenes", orderSchema);