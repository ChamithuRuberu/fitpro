export type NutritionCategory = 'supplement' | 'food';

export type NutritionItem = {
  id: string;
  name: string;
  category: NutritionCategory;
  subCategory: string;
  description: string;
  benefits: string[];
  image: string;
  tags: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fats?: number;
  };
  servingSize?: string;
  price?: {
    amount: number;
    currency: string;
  };
};

export type NutritionFilter = {
  category: string;
  subCategories: string[];
  searchQuery: string;
  priceRange?: {
    min: number;
    max: number;
  };
  tags?: string[];
}; 