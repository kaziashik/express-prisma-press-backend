import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import config from "./config";
import cors from "cors";
import { userRouter } from "./modules/users/user.route";
import { authRouter } from "./modules/auth/auth.routes";
import { commentRoutes } from "./modules/comments/comment.routes";
import { postRoutes } from "./modules/post/post.routes";
import { notFound } from "./middlewares/notFound";
import httpsStatus from "http-status";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { subscriptionRoutes} from "./modules/subscription/subscription.route";
import { stripe } from "./lib/stripe";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);


const endpointSecret=config.stripe_webhook_secret;
app.post("/api/subscription/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    console.log("🔥 WEBHOOK HIT");
  let event = request.body;
  console.log("strip requet body",event);
  console.log("strip requet headers",request.headers);
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature']!;
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400).json({
        message: err.message
      });
    }
  }


  console.log("even after try block",event);

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
}
)



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello, world");
});

// app.post();
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/subscription",subscriptionRoutes)

//if any roud not fund 
app.use(notFound);

//golable error handler
app.use(globalErrorHandler);

export default app;
