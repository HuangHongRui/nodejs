const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
    },
    slug: String,
    rating: {
      type: Number,
      default: 111,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    duration: {
      type: Number,
      default: 6,
    },
    maxGroupSize: {
      type: Number,
      default: 100,
    },
    difficulty: {
      type: String,
      default: "medium",
    },
    ratingsAverage: {
      type: Number,
      default: 0.7,
    },
    ratingsQuantity: {
      type: Number,
      default: 9.7,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a Summary"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a ImageCover"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    images: [String],
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual("durationWeek").get(function () {
  return this.duration / 7;
});

tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.post("save", (doc, next) => {
  console.log(doc);
  next();
});

tourSchema.post("save", (doc, next) => {
  console.log("FUCK ANYTHING.");
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
