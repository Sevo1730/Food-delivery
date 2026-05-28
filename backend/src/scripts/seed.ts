import "dotenv/config";
import mongoose from "mongoose";
import FoodCategory from "../models/FoodCategory";
import Food from "../models/Food";
import User, { UserRole } from "../models/User";

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nomnom";

const categoryNames = ["Appetizers", "Salads", "Lunch favorites"];

const foodsData = [
  // Appetizers
  {
    foodName: "Finger food",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=900&q=80",
    ingredients: "Creamy bites with herbs, fruit glaze, and crisp toast.",
    categoryName: "Appetizers",
  },
  {
    foodName: "Cranberry Brie Bites",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
    ingredients: "Soft brie, cranberry jam, crackers, and fresh chives.",
    categoryName: "Appetizers",
  },
  {
    foodName: "Sunshine Stackers",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=80",
    ingredients: "Tomato bruschetta, whipped cheese, basil, and olive oil.",
    categoryName: "Appetizers",
  },
  {
    foodName: "Brie Crostini Appetizer",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=900&q=80",
    ingredients: "Roasted brie crostini with pomegranate and thyme.",
    categoryName: "Appetizers",
  },
  {
    foodName: "Steak Toast",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?auto=format&fit=crop&w=900&q=80",
    ingredients: "Sliced steak on garlic toast with pepper sauce.",
    categoryName: "Appetizers",
  },
  {
    foodName: "Grilled Chicken",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80",
    ingredients: "Juicy chicken breast with potatoes and tomato salsa.",
    categoryName: "Appetizers",
  },
  // Salads
  {
    foodName: "Grilled Chicken Cobb Salad",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    ingredients: "Fresh greens, grilled chicken, avocado, egg, and blue cheese.",
    categoryName: "Salads",
  },
  {
    foodName: "Burrata Caprese",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1608032364895-84e0c9e32f8b?auto=format&fit=crop&w=900&q=80",
    ingredients: "Creamy burrata, heirloom tomatoes, basil, and aged balsamic.",
    categoryName: "Salads",
  },
  {
    foodName: "Beetroot and Orange Salad",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
    ingredients: "Roasted beets, citrus segments, goat cheese, and walnuts.",
    categoryName: "Salads",
  },
  // Lunch favorites
  {
    foodName: "Pan Seared Salmon",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
    ingredients: "Crispy-skin salmon with lemon butter, capers, and dill.",
    categoryName: "Lunch favorites",
  },
  {
    foodName: "Chicken Tagliatelle",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
    ingredients: "Pasta with grilled chicken, tomatoes, and cream sauce.",
    categoryName: "Lunch favorites",
  },
  {
    foodName: "Tuna Steak",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
    ingredients: "Seared tuna with wasabi, ginger, and sesame crust.",
    categoryName: "Lunch favorites",
  },
  {
    foodName: "Gourmet Burger",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    ingredients: "Wagyu beef, aged cheddar, caramelized onion, and truffle aioli.",
    categoryName: "Lunch favorites",
  },
  {
    foodName: "Sea Bass Fillet",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
    ingredients: "Roasted sea bass with herb butter and seasonal vegetables.",
    categoryName: "Lunch favorites",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clean existing data
    await Promise.all([
      FoodCategory.deleteMany({}),
      Food.deleteMany({}),
    ]);
    console.log("🗑️  Cleared existing foods and categories");

    // Create categories
    const categories = await FoodCategory.insertMany(
      categoryNames.map((name) => ({ categoryName: name }))
    );
    const categoryMap = new Map(categories.map((c) => [c.categoryName, c._id]));
    console.log(`📁 Created ${categories.length} categories`);

    // Create foods
    const foods = await Food.insertMany(
      foodsData.map((f) => ({
        foodName: f.foodName,
        price: f.price,
        image: f.image,
        ingredients: f.ingredients,
        category: categoryMap.get(f.categoryName),
      }))
    );
    console.log(`🍔 Created ${foods.length} foods`);

    // Create admin user if not exists
    const adminEmail = "admin@nomnom.mn";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        email: adminEmail,
        password: "admin123",
        role: UserRole.ADMIN,
        isVerified: true,
      });
      console.log(`👑 Admin created → ${adminEmail} / admin123`);
    } else {
      console.log(`👑 Admin already exists → ${adminEmail}`);
    }

    console.log("✅ Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
