interface ProductCategoriesType {}

export const ProductCategories = [
  {
    category: "clothing",
    subCategories: [
      {
        title: "Tops",
        description: "",
        slug: "t-shirt",
      },
      {
        title: "Jackets",
        description: "",
        slug: "hoodie",
      },
      {
        title: "Bottoms",
        description: "",
        slug: "pants",
      },
      {
        title: "Denim",
        description: "",
        slug: "shorts",
      },
      {
        title: "Activewear",
        description: "",
        slug: "t-shirt",
      },
    ],
  },
  {
    category: "shoes",
    subCategories: [
      {
        title: "Sneakers",
        description: "",
        slug: "t-shirt",
      },
      {
        title: "Dress Shoes",
        description: "",
        slug: "hoodie",
      },
      {
        title: "Slides",
        description: "",
        slug: "pants",
      },
    ],
  },
  {
    category: "accessories",
    subCategories: [
      {
        title: "Hats",
        description: "",
        slug: "t-shirt",
      },
      {
        title: "Sunglasses",
        description: "",
        slug: "hoodie",
      },
      {
        title: "Wallets",
        description: "",
        slug: "pants",
      },
      {
        title: "Belts",
        description: "",
        slug: "pants",
      },
    ],
  },
];

export const productsTags = [
  "best Seller",
  "featured ",
  "sale",
  "popular",
  "new",
  "trending",
];

export const productsSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export const productsColors = [
  "Black",
  "Red",
  "Yellow",
  "White",
  "Gray",
  "Pink",
];

export const sortOptions = [
  { label: "Date: Old to new", value: "createdAt.asc" },
  {
    label: "Date: New to old",
    value: "createdAt.desc",
  },
  { label: "Price: Low to high", value: "price.asc" },
  { label: "Price: High to low", value: "price.desc" },
  {
    label: "Alphabetical: A to Z",
    value: "name.asc",
  },
  {
    label: "Alphabetical: Z to A",
    value: "name.desc",
  },
];

