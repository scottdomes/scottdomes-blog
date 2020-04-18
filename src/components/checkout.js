import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import styles from './styles/checkout.module.css'

const stripePromise = loadStripe(process.env.STRIPE_KEY)
const redirectToCheckout = async event => {
  event.preventDefault()
  const stripe = await stripePromise
  const { error } = await stripe.redirectToCheckout({
    items: [{ sku: process.env.STRIPE_PRESALE_SKU, quantity: 1 }],
    successUrl: `${window.location.origin}/thanks/`,
    cancelUrl: `${window.location.origin}/react-developer-challenge/`,
  })
  if (error) {
    console.warn("Error:", error)
  }
}
const Checkout = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <button className={styles.button} onClick={redirectToCheckout}>
        JOIN THE CHALLENGE
      </button>
    </div>
  )
}
export default Checkout
