interface ProductCategoriesType {}

export const ProductCategories = [
  {
    category: "clothing",
    subCategories: [
      {
        title: "Tops",
        description: "",
        slug: "tops",
      },
      {
        title: "Jackets",
        description: "",
        slug: "jackets",
      },
      {
        title: "Bottoms",
        description: "",
        slug: "bottoms",
      },
      {
        title: "Denims",
        description: "",
        slug: "denims",
      },
      {
        title: "Activewear",
        description: "",
        slug: "activewear",
      },
    ],
  },
  {
    category: "shoes",
    subCategories: [
      {
        title: "Sneakers",
        description: "",
        slug: "sneakers",
      },
      {
        title: "Dress Shoes",
        description: "",
        slug: "dress-shoes",
      },
      {
        title: "Slides",
        description: "",
        slug: "slides",
      },
    ],
  },
  {
    category: "accessories",
    subCategories: [
      {
        title: "Hats",
        description: "",
        slug: "hats",
      },
      {
        title: "Sunglasses",
        description: "",
        slug: "sunglasses",
      },
      {
        title: "Wallets",
        description: "",
        slug: "wallet",
      },
      {
        title: "Belts",
        description: "",
        slug: "belts",
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

export const getSubCategories = (category: string) => {
  if (!category) return [];
  const subcategories =
    ProductCategories.find((c) => c.category === category.toLocaleLowerCase())?.subCategories.map(
      (s) => ({
        label: s.title,
        value: s.slug,
      })
    ) ?? [];
    return subcategories
};
