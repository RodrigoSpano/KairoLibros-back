export type payment_method = "mercadopago" | "efectivo" | "transferencia"
export type order_status = "pending" | "aproved" | "canceled"

export type NodemailerConfig = {
  from: string,
  to: string,
  subject: string,
  html: string
}