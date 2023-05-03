import { Schema, model, models } from "mongoose";

const cardSchema = new Schema({
  name: String,
  cost: String,
  type: String,
  cooldown: String,
  description: String,
  image: String,
  background: String,
});

const Cards = models.card || model("card", cardSchema);
export default Cards;
